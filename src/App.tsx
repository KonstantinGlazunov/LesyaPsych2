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

const getLegalPageFromUrl = (): LegalPageKey | null => {
  const page = new URLSearchParams(window.location.search).get('page');

  if (page === 'agb' || page === 'datenschutz' || page === 'impressum') {
    return page;
  }

  return null;
};

function App() {
  const legalPage = useMemo(() => getLegalPageFromUrl(), []);

  useEffect(() => {
    document.documentElement.lang = legalPage ? 'de' : 'ru';
    document.title = legalPage
      ? `${legalPage === 'agb' ? 'AGB' : legalPage === 'datenschutz' ? 'Datenschutzerklärung' : 'Impressum'} | Леся Афанасьева`
      : 'Леся Афанасьева';
  }, [legalPage]);

  if (legalPage) {
    return (
      <>
        <LegalPage page={legalPage} />
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
          <PsyQuiz />
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
