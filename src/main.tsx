import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './styles.css';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { LearnIndex, LessonPage } from './pages/Learn';
import { PracticeRun, PracticeSetup } from './pages/Practice';
import { Exam } from './pages/Exam';
import { KeyChecks, Mistakes, QuestionPage, Saved, Search, Settings } from './pages/Lists';
import { Empty } from './components/ui';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="learn" element={<LearnIndex />} />
          <Route path="learn/:id" element={<LessonPage />} />
          <Route path="practice" element={<PracticeSetup />} />
          <Route path="practice/go" element={<PracticeRun />} />
          <Route path="exam" element={<Exam />} />
          <Route path="mistakes" element={<Mistakes />} />
          <Route path="key-checks" element={<KeyChecks />} />
          <Route path="saved" element={<Saved />} />
          <Route path="search" element={<Search />} />
          <Route path="settings" element={<Settings />} />
          <Route path="q/:id" element={<QuestionPage />} />
          <Route path="*" element={<div className="page"><Empty title="Page not found" /></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
