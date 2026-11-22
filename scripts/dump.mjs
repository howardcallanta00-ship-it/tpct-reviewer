import fs from 'node:fs';
const d = process.argv[2];
const q = JSON.parse(fs.readFileSync(`src/data/raw/${d}.json`, 'utf8'));
for (const x of q) {
  console.log(`\n## ${x.id} key=${x.keyIndex}`);
  console.log('Q: ' + x.stem);
  for (const c of x.context) console.log('  ' + (c.type === 'img' ? '[IMG ' + c.src.split('/').pop() + ']' : (c.type === 'li' ? '• ' : '') + c.text));
  x.options.forEach((o, i) => console.log(`  ${i === x.keyIndex ? '*' : ' '}${i + 1}. ${o.text}${o.img ? ' [IMG ' + o.img.split('/').pop() + ']' : ''}`));
}
