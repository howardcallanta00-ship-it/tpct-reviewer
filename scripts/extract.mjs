// Extracts questions, red-marked answer keys and images from the six TOPCIT reviewer .docx files.
// Usage: node scripts/extract.mjs "<folder containing the .docx reviewers>"
// Output: src/data/raw/<domain>.json and public/img/<domain>/*.webp
import fs from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
import sharp from 'sharp';

const SRC = process.argv[2];
if (!SRC) {
  console.error('Pass the folder that holds the reviewer .docx files.');
  process.exit(1);
}

const DOMAINS = [
  { id: 'software', file: /^1\..*Software/i },
  { id: 'data', file: /^2\..*Data/i },
  { id: 'architecture', file: /^3\..*Architecture/i },
  { id: 'security', file: /^4\..*Security/i },
  { id: 'business', file: /^5\..*Business/i },
  { id: 'management', file: /^6\..*Project Management/i },
];

const decode = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

function parseParagraphs(xml) {
  const body = xml.slice(xml.indexOf('<w:body'));
  const paras = [];
  for (const m of body.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)) {
    const px = m[0];
    const numId = (px.match(/<w:numId w:val="(\d+)"/) || [])[1] || null;
    const red = /w:color w:val="FF0000"/i.test(px);
    const images = [...px.matchAll(/r:embed="(rId\d+)"/g)].map((x) => x[1]);
    let text = '';
    for (const r of px.matchAll(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>|<w:tab\/>|<w:br\/>/g)) {
      if (r[0].startsWith('<w:tab')) text += ' ';
      else if (r[0].startsWith('<w:br')) text += '\n';
      else text += r[1];
    }
    text = decode(text).replace(/[ \t]+/g, ' ').trim();
    if (!text && images.length === 0) continue;
    paras.push({ numId, red, images, text });
  }
  return paras;
}

function groupQuestions(paras) {
  const counts = {};
  for (const p of paras) if (p.numId) counts[p.numId] = (counts[p.numId] || 0) + 1;
  const stemId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const questions = [];
  let cur = null;
  for (const p of paras) {
    if (p.numId === stemId) {
      cur = { stem: p, items: [] };
      questions.push(cur);
    } else if (cur) {
      cur.items.push(p);
    }
  }
  // Split each question's items into runs of the same list (numId) vs. plain context.
  const out = [];
  for (const q of questions) {
    const groups = [];
    for (const it of q.items) {
      const last = groups[groups.length - 1];
      if (it.numId && last && last.numId === it.numId) last.paras.push(it);
      else groups.push({ numId: it.numId, paras: [it] });
    }
    const lists = groups.filter((g) => g.numId);
    let optGroup = lists.find((g) => g.paras.some((p) => p.red)) || [...lists].reverse().find((g) => g.paras.length >= 3);
    if (!optGroup) {
      // No option list: this "question" is really a numbered context line of the previous question.
      const prev = out[out.length - 1];
      if (prev) {
        prev.lateContext.push(q.stem, ...q.items);
        continue;
      }
    }
    out.push({ stem: q.stem, groups, optGroup, lateContext: [] });
  }
  return out;
}

async function main() {
  const files = await fs.readdir(SRC);
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
  await fs.mkdir(path.join(root, 'src/data/raw'), { recursive: true });
  let total = 0;
  for (const dom of DOMAINS) {
    const fname = files.find((f) => dom.file.test(f) && f.endsWith('.docx'));
    if (!fname) throw new Error('Missing reviewer for ' + dom.id);
    const zip = await JSZip.loadAsync(await fs.readFile(path.join(SRC, fname)));
    const xml = await zip.file('word/document.xml').async('string');
    const rels = await zip.file('word/_rels/document.xml.rels').async('string');
    const relMap = {};
    for (const m of rels.matchAll(/<Relationship\s[^>]*>/g)) {
      const rid = (m[0].match(/\sId="([^"]+)"/) || [])[1];
      const target = (m[0].match(/\sTarget="([^"]+)"/) || [])[1];
      if (rid && target) relMap[rid] = target.replace(/^\/word\//, '');
    }
    const imgDir = path.join(root, 'public/img', dom.id);
    await fs.mkdir(imgDir, { recursive: true });

    const groups = groupQuestions(parseParagraphs(xml));
    const questions = [];
    let n = 0;
    for (const g of groups) {
      n++;
      const id = `${dom.id}-${String(n).padStart(2, '0')}`;
      let imgCount = 0;
      const saveImgs = async (rids) => {
        const outs = [];
        for (const rid of rids) {
          const target = relMap[rid];
          if (!target) continue;
          const file = zip.file('word/' + target.replace(/^\.\//, ''));
          if (!file) continue;
          imgCount++;
          const name = `${id}-${imgCount}.webp`;
          const buf = await file.async('nodebuffer');
          try {
            await sharp(buf).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(imgDir, name));
            outs.push(`img/${dom.id}/${name}`);
          } catch (e) {
            console.warn('Image skipped', id, target, e.message);
          }
        }
        return outs;
      };

      const context = [];
      const pushCtx = async (p, list = false) => {
        if (p.text) context.push({ type: list ? 'li' : 'p', text: p.text });
        for (const src of await saveImgs(p.images)) context.push({ type: 'img', src });
      };
      for (const p of g.stem.images.length ? [{ ...g.stem, text: '' }] : []) await pushCtx(p);
      for (const grp of g.groups) {
        if (grp === g.optGroup) continue;
        for (const p of grp.paras) await pushCtx(p, !!grp.numId);
      }
      for (const p of g.lateContext) await pushCtx(p);

      const options = [];
      let answer = -1;
      if (g.optGroup) {
        for (const [i, p] of g.optGroup.paras.entries()) {
          const imgs = await saveImgs(p.images);
          options.push({ text: p.text, img: imgs[0] || null });
          if (p.red && answer === -1) answer = i;
        }
      }
      let stem = g.stem.text;
      const letter = stem.match(/\s-\s*([A-D])\s*$/);
      if (letter) {
        stem = stem.replace(/\s-\s*[A-D]\s*$/, '');
        if (answer === -1 || g.stem.red) answer = 'ABCD'.indexOf(letter[1]);
      }
      questions.push({ id, stem, context, options, keyIndex: answer });
    }
    total += questions.length;
    await fs.writeFile(path.join(root, 'src/data/raw', dom.id + '.json'), JSON.stringify(questions, null, 1));
    const missing = questions.filter((q) => q.keyIndex < 0).map((q) => q.id);
    console.log(`${dom.id}: ${questions.length} questions, no key: ${missing.join(', ') || 'none'}`);
  }
  console.log('Total', total);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
