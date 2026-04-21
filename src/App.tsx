import { useEffect, useMemo } from 'react';
import PsyNavigation from './sections/PsyNavigation';
import PsyHero from './sections/PsyHero';
import PsyVideo from './sections/PsyVideo';
import PsyStates from './sections/PsyStates';
import PsyQuiz from './sections/PsyQuiz';
import PsyAbout from './sections/PsyAbout';
import PsyHelp from './sections/PsyHelp';
import PsyMigration from './sections/PsyMigration';
import PsyProcess from './sections/PsyProcess';
import PsyCTA from './sections/PsyCTA';
import PsyFooter from './sections/PsyFooter';
import WhatsAppButton from './components/WhatsAppButton';
import LegalPage from './sections/LegalPage';
import type { LegalPageKey } from './lib/contact';
import BlogPage from './sections/BlogPage';
import { getPostBySlug } from './lib/blog';
import BlogAdmin from './sections/BlogAdmin';
import { getSiteLang } from './lib/lang';

const getLegalPageFromUrl = (): LegalPageKey | null => {
  const page = new URLSearchParams(window.location.search).get('page');

  if (page === 'agb' || page === 'datenschutz' || page === 'impressum') {
    return page;
  }

  return null;
};

function App() {
  const legalPage = useMemo(() => getLegalPageFromUrl(), []);
  const blogParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const siteLang = useMemo(() => getSiteLang(), []);
  const isBlogPage = blogParams.get('page') === 'blog';
  const isAdminPage = blogParams.get('page') === 'admin';
  const shouldOpenQuiz = blogParams.get('quiz') === '1';
  const blogSlug = blogParams.get('post');

  useEffect(() => {
    const isLegal = Boolean(legalPage);
    document.documentElement.lang = isLegal ? 'de' : siteLang;

    if (isLegal) {
      document.title = `${legalPage === 'agb' ? 'AGB' : legalPage === 'datenschutz' ? 'Datenschutzerklärung' : 'Impressum'} | Леся Афанасьева`;
      return;
    }

    if (isBlogPage) {
      const post = blogSlug ? getPostBySlug(blogSlug) : null;
      document.title = post ? `${post.title} | Блог` : 'Блог | Леся Афанасьева';
      return;
    }

    if (isAdminPage) {
      document.title = 'Админка блога | Леся Афанасьева';
      return;
    }

    document.title = 'Леся Афанасьева';
  }, [legalPage, isBlogPage, blogSlug, siteLang]);

  useEffect(() => {
    if (legalPage || isBlogPage || isAdminPage) {
      return;
    }

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const element = document.querySelector(hash);
      if (!element) return;

      element.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    const timeoutId = window.setTimeout(scrollToHash, 0);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [legalPage, isBlogPage, isAdminPage]);

  if (legalPage) {
    return (
      <>
        <PsyNavigation />
        <LegalPage page={legalPage} />
        <PsyFooter />
      </>
    );
  }

  if (isBlogPage) {
    return (
      <>
        <PsyNavigation />
        <BlogPage postSlug={blogSlug ?? undefined} />
        <PsyFooter />
      </>
    );
  }

  if (isAdminPage) {
    return (
      <>
        <BlogAdmin />
        <PsyFooter />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      <PsyNavigation />
      <main>
        <section id="hero">
          <PsyHero />
        </section>
        <section id="video">
          <PsyVideo />
        </section>
        <section id="states">
          <PsyStates />
        </section>
        <section id="quiz">
          <PsyQuiz autoOpen={shouldOpenQuiz} />
        </section>
        <section id="about">
          <PsyAbout />
        </section>
        <section id="help">
          <PsyHelp />
        </section>
        <section id="migration">
          <PsyMigration />
        </section>
        <section id="process">
          <PsyProcess />
        </section>
        <section id="cta">
          <PsyCTA />
        </section>
      </main>
      <PsyFooter />
      <WhatsAppButton />
    </div>
  );
}

export default App;
