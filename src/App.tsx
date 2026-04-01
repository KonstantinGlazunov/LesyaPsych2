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

function App() {
  return (
    <div className="min-h-screen bg-[#F7F4F2]" lang="en">
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
