import { useMemo } from 'react';
import { ArrowLeft, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_NAME_DE,
  CONTACT_PHONE_DISPLAY,
  LEGAL_PAGE_TITLES,
  type LegalPageKey,
  WHATSAPP_LINK,
  getHomeHref,
  getLegalHref,
} from '../lib/contact';

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const legalContent: Record<
  LegalPageKey,
  {
    eyebrow: string;
    title: string;
    intro: string;
    sections: LegalSection[];
  }
> = {
  impressum: {
    eyebrow: 'Pflichtangaben',
    title: 'Impressum',
    intro:
      'Angaben gemäß § 5 DDG und § 18 Absatz 2 MStV für dieses Online-Angebot.',
    sections: [
      {
        title: 'Diensteanbieterin',
        paragraphs: [
          CONTACT_NAME_DE,
          'Psychologische Beratung und begleitende Gespräche im Online- und Präsenzkontext.',
          CONTACT_ADDRESS,
        ],
      },
      {
        title: 'Kontakt',
        paragraphs: [
          'Telefon / WhatsApp: auf Anfrage',
          `E-Mail: ${CONTACT_EMAIL}`,
        ],
      },
      {
        title: 'Inhaltlich verantwortlich',
        paragraphs: [
          `Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Absatz 2 MStV: ${CONTACT_NAME_DE}, ${CONTACT_ADDRESS}`,
        ],
      },
      {
        title: 'Berufsbezogene Hinweise',
        paragraphs: [
          'Die angebotenen Leistungen dienen der psychologischen Beratung und Begleitung. Sie ersetzen keine ärztliche, psychiatrische, psychotherapeutische oder heilkundliche Behandlung.',
          'Sofern akute psychische Krisen, Selbst- oder Fremdgefährdung vorliegen, ist unverzüglich medizinische oder notfallmäßige Hilfe in Anspruch zu nehmen.',
        ],
      },
      {
        title: 'Verbraucherstreitbeilegung',
        paragraphs: [
          'Es besteht keine Verpflichtung und keine Bereitschaft zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle.',
          'Die frühere EU-Plattform zur Online-Streitbeilegung wurde zum 20. Juli 2025 eingestellt.',
        ],
      },
      {
        title: 'Haftung für Inhalte und Links',
        paragraphs: [
          'Die Inhalte dieser Website wurden mit großer Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Informationen wird jedoch keine Gewähr übernommen, soweit gesetzlich zulässig.',
          'Diese Website enthält Verlinkungen zu externen Diensten, insbesondere zu WhatsApp. Für Inhalte und Datenverarbeitungen externer Anbieter sind ausschließlich deren Betreiber verantwortlich.',
        ],
      },
    ],
  },
  datenschutz: {
    eyebrow: 'Datenschutz',
    title: 'Datenschutzerklärung',
    intro:
      'Diese Hinweise informieren über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten beim Besuch dieser Website und bei einer Kontaktaufnahme.',
    sections: [
      {
        title: '1. Verantwortliche Stelle',
        paragraphs: [
          CONTACT_NAME_DE,
          CONTACT_ADDRESS,
          'Telefon / WhatsApp: auf Anfrage',
          `E-Mail: ${CONTACT_EMAIL}`,
        ],
      },
      {
        title: '2. Besuch der Website',
        paragraphs: [
          'Beim Aufruf dieser Website können technisch erforderliche Verbindungsdaten verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, angeforderte Datei, Browsertyp, Betriebssystem sowie Referrer-Informationen.',
          'Die Verarbeitung erfolgt zur stabilen Bereitstellung der Website, zur Fehleranalyse und zur Wahrung der Sicherheit des Angebots.',
          'Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f DSGVO. Das berechtigte Interesse liegt in einem sicheren und funktionsfähigen Webauftritt.',
        ],
      },
      {
        title: '3. Kontaktaufnahme über WhatsApp oder Telefon',
        paragraphs: [
          'Wenn Sie den WhatsApp-Link anklicken, verlassen Sie diese Website und werden zu einem Dienst der WhatsApp Ireland Limited bzw. der Meta-Unternehmensgruppe weitergeleitet. Dabei können durch den Drittanbieter personenbezogene Daten, insbesondere Ihre IP-Adresse sowie Kommunikationsdaten, verarbeitet werden.',
          'Wenn Sie über WhatsApp oder telefonisch Kontakt aufnehmen, werden die von Ihnen übermittelten Angaben zur Bearbeitung Ihres Anliegens und für mögliche Rückfragen verarbeitet.',
          'Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe b DSGVO, soweit Ihre Anfrage auf die Anbahnung oder Durchführung einer Beratung gerichtet ist, sowie Artikel 6 Absatz 1 Buchstabe f DSGVO für die effiziente Kommunikation mit Interessentinnen und Interessenten.',
        ],
      },
      {
        title: '4. Kontakt per E-Mail',
        paragraphs: [
          'Wenn Sie per E-Mail Kontakt aufnehmen, werden die von Ihnen übermittelten Daten ausschließlich zur Bearbeitung Ihrer Anfrage verarbeitet.',
          'Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe b DSGVO bei vorvertraglichen Anfragen und im Übrigen Artikel 6 Absatz 1 Buchstabe f DSGVO.',
        ],
      },
      {
        title: '5. Empfänger der Daten',
        paragraphs: [
          'Empfängerinnen und Empfänger können technische Dienstleister für Hosting und IT-Betrieb sowie Kommunikationsdienstleister sein, soweit dies zur Bereitstellung der Website oder zur Kommunikation erforderlich ist.',
          'Eine Weitergabe erfolgt im Übrigen nur, wenn eine gesetzliche Verpflichtung besteht oder Sie eingewilligt haben.',
        ],
      },
      {
        title: '6. Speicherdauer',
        paragraphs: [
          'Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.',
          'Anfragen werden nach abschließender Bearbeitung gelöscht, sofern keine gesetzlichen Pflichten oder berechtigten Interessen einer Löschung entgegenstehen.',
        ],
      },
      {
        title: '7. Ihre Rechte',
        bullets: [
          'Recht auf Auskunft gemäß Artikel 15 DSGVO',
          'Recht auf Berichtigung gemäß Artikel 16 DSGVO',
          'Recht auf Löschung gemäß Artikel 17 DSGVO',
          'Recht auf Einschränkung der Verarbeitung gemäß Artikel 18 DSGVO',
          'Recht auf Datenübertragbarkeit gemäß Artikel 20 DSGVO',
          'Recht auf Widerspruch gemäß Artikel 21 DSGVO',
          'Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft',
          'Beschwerderecht bei einer Datenschutzaufsichtsbehörde',
        ],
      },
      {
        title: '8. Externe Links',
        paragraphs: [
          'Diese Website kann Links zu externen Websites und Diensten enthalten. Für die Inhalte und Datenschutzstandards der verlinkten Anbieter sind ausschließlich deren Betreiber verantwortlich.',
          'Bitte prüfen Sie vor der Nutzung externer Dienste die dort geltenden Datenschutzinformationen.',
        ],
      },
      {
        title: '9. Cookies und Tracking',
        paragraphs: [
          'Auf dieser Website werden nach aktuellem Stand keine nicht technisch notwendigen Cookies, kein Profiling und keine Analyse- oder Marketing-Tools eingesetzt.',
          'Sollten künftig zustimmungspflichtige Tracking-Technologien eingesetzt werden, werden hierüber gesonderte Informationen bereitgestellt und erforderliche Einwilligungen eingeholt.',
        ],
      },
    ],
  },
  agb: {
    eyebrow: 'Vertragsbedingungen',
    title: 'Allgemeine Geschäftsbedingungen',
    intro:
      'Diese Allgemeinen Geschäftsbedingungen gelten für die Vereinbarung und Durchführung von psychologischen Beratungsleistungen über diese Website oder nach individueller Kontaktaufnahme.',
    sections: [
      {
        title: '1. Geltungsbereich',
        paragraphs: [
          'Diese AGB gelten für sämtliche Beratungsleistungen von ' +
            CONTACT_NAME_DE +
            ' gegenüber Verbraucherinnen, Verbrauchern und sonstigen Auftraggebenden, soweit nichts Abweichendes schriftlich vereinbart wurde.',
        ],
      },
      {
        title: '2. Leistungsgegenstand',
        paragraphs: [
          'Gegenstand des Angebots sind psychologische Beratungs- und Begleitgespräche. Es wird kein bestimmter Erfolg geschuldet.',
          'Die Leistungen stellen keine Heilbehandlung, Psychotherapie, medizinische Diagnose, Rechts- oder Steuerberatung dar und ersetzen keine notwendige fachliche Behandlung durch approbierte oder anderweitig befugte Berufsgruppen.',
        ],
      },
      {
        title: '3. Vertragsschluss',
        paragraphs: [
          'Die Darstellung der Leistungen auf dieser Website stellt noch kein verbindliches Angebot zum Abschluss eines Vertrages dar.',
          'Ein Vertrag kommt erst zustande, wenn ein Beratungstermin nach einer individuellen Anfrage ausdrücklich bestätigt wurde.',
        ],
      },
      {
        title: '4. Preise und Fälligkeit',
        paragraphs: [
          'Honorare, Leistungsumfang und Zahlungsmodalitäten werden individuell vor der Terminvereinbarung abgestimmt.',
          'Soweit nichts anderes vereinbart ist, ist die Vergütung unmittelbar nach Erbringung der Leistung ohne Abzug fällig.',
        ],
      },
      {
        title: '5. Termine und Mitwirkung',
        paragraphs: [
          'Vereinbarte Termine sind verbindlich. Terminverschiebungen oder Absagen sollten möglichst frühzeitig mitgeteilt werden.',
          'Eine vertrauensvolle und wahrheitsgemäße Mitwirkung der ratsuchenden Person ist Voraussetzung für eine sinnvolle Beratungsarbeit.',
        ],
      },
      {
        title: '6. Haftung',
        paragraphs: [
          'Es wird unbeschränkt gehaftet für Vorsatz und grobe Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit.',
          'Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Im Übrigen ist die Haftung, soweit gesetzlich zulässig, ausgeschlossen.',
        ],
      },
      {
        title: '7. Vertraulichkeit und Datenschutz',
        paragraphs: [
          'Persönliche Inhalte aus Beratungen werden vertraulich behandelt. Gesetzliche Offenlegungs- oder Mitwirkungspflichten bleiben unberührt.',
          'Im Übrigen gilt die Datenschutzerklärung dieser Website.',
        ],
      },
      {
        title: '8. Schlussbestimmungen',
        paragraphs: [
          'Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts, soweit dem keine zwingenden verbraucherschützenden Vorschriften entgegenstehen.',
          'Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.',
        ],
      },
    ],
  },
};

const legalLinks: Array<{ key: LegalPageKey; label: string }> = [
  { key: 'impressum', label: 'Impressum' },
  { key: 'datenschutz', label: 'Datenschutzerklärung' },
  { key: 'agb', label: 'AGB' },
];

type LegalPageProps = {
  page: LegalPageKey;
};

const LegalPage = ({ page }: LegalPageProps) => {
  const content = legalContent[page];
  const pageTitle = useMemo(() => LEGAL_PAGE_TITLES[page], [page]);

  return (
    <div className="min-h-screen bg-[#F7F4F2] text-[#2B2B2B]">
      <header className="sticky top-0 z-40 border-b border-[#2B2B2B]/10 bg-[#F7F4F2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href={getHomeHref()}
            className="font-serif text-lg text-[#2B2B2B] transition-colors hover:text-[#A3B18A]"
          >
            {CONTACT_NAME_DE}
          </a>

          <nav className="hidden items-center gap-5 md:flex">
            {legalLinks.map((link) => (
              <a
                key={link.key}
                href={getLegalHref(link.key)}
                aria-current={page === link.key ? 'page' : undefined}
                className={`text-sm transition-colors ${
                  page === link.key ? 'text-[#2B2B2B]' : 'text-[#5A5A5A] hover:text-[#2B2B2B]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.8fr)_320px]">
          <section className="overflow-hidden rounded-[2rem] bg-white shadow-softer">
            <div className="border-b border-[#2B2B2B]/8 bg-gradient-to-br from-[#F5EEE8] via-white to-[#EDF2E7] px-6 py-8 sm:px-10 sm:py-10">
              <a
                href={getHomeHref()}
                className="mb-5 inline-flex items-center gap-2 text-sm text-[#5A5A5A] transition-colors hover:text-[#2B2B2B]"
              >
                <ArrowLeft className="h-4 w-4" />
                Zur Startseite
              </a>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-[#A3B18A]">
                {content.eyebrow}
              </p>
              <h1 className="mb-4 text-4xl sm:text-5xl">{content.title}</h1>
              <p className="max-w-3xl text-base text-[#5A5A5A] sm:text-lg">{content.intro}</p>
            </div>

            <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
              {content.sections.map((section) => (
                <section key={section.title} className="space-y-4">
                  <h2 className="text-2xl">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="text-[#4F4F4F]">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-3 text-[#4F4F4F]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#D8B4A0]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] bg-[#2B2B2B] p-6 text-white shadow-soft">
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-white/50">
                Kontakt
              </p>
              <h2 className="mb-5 text-2xl text-white">{pageTitle}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-[#D8B4A0]" />
                  <p className="text-sm text-white/80">{CONTACT_ADDRESS}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-[#D8B4A0]" />
                  <a
                    href={`tel:${CONTACT_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-[#D8B4A0]" />
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white p-6 shadow-soft">
              <p className="mb-3 text-sm uppercase tracking-[0.28em] text-[#A3B18A]">
                Hinweis
              </p>
              <p className="mb-5 text-sm text-[#5A5A5A]">
                Beim Klick auf WhatsApp verlassen Sie diese Website. Es gelten dann die
                Datenschutzbestimmungen des externen Anbieters.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp öffnen
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
