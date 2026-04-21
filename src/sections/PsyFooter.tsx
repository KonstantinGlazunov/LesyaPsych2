import { Heart, MessageCircle, Send, Mail, MapPin } from 'lucide-react';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_NAME,
  TELEGRAM_LINK,
  WHATSAPP_LINK,
  getHomeHref,
  getLegalHref,
} from '../lib/contact';
import { isUk } from '../lib/lang';

const PsyFooter = () => {
  const uk = isUk();
  const homeHref = getHomeHref();
  const homeWithLang = uk ? `${homeHref}?lang=uk` : homeHref;
  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    const page = new URLSearchParams(window.location.search).get('page');
    if (page) {
      event.preventDefault();
      window.location.href = `${homeHref}${uk ? '?lang=uk' : ''}${hash}`;
      return;
    }
    const element = document.querySelector(hash);
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#2B2B2B] text-white py-12 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif mb-4">{CONTACT_NAME}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {uk
                ? 'Психолог-консультант. Допомагаю розібратися в собі, знизити тривожність і відновити внутрішню опору.'
                : 'Консультирующий психолог. Помогаю разобраться в себе, снизить тревожность и восстановить внутреннюю опору.'}
            </p>
            <p className="text-white/40 text-xs">
              {uk
                ? 'Я не даю готових відповідей — я допомагаю зрозуміти, що насправді з вами відбувається.'
                : 'Я не даю готовых ответов — я помогаю понять, что на самом деле происходит с вами.'}
            </p>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/60 mb-4">{uk ? 'Контакти' : 'Kontakt'}</h4>
            <div className="space-y-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">WhatsApp</span>
              </a>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Send className="w-5 h-5" />
                <span className="text-sm">Telegram</span>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">{CONTACT_EMAIL}</span>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <MapPin className="mt-0.5 h-5 w-5" />
                <span className="text-sm">{CONTACT_ADDRESS}</span>
              </div>
              <p className="pt-1 text-xs text-white/40">
                {uk
                  ? 'Натискаючи на WhatsApp, ви залишаєте цей сайт. Далі діють правила конфіденційності зовнішнього сервісу.'
                  : 'Mit Klick auf WhatsApp verlassen Sie diese Website. Es gelten dann die Datenschutzbestimmungen des externen Anbieters.'}
              </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/60 mb-4">{uk ? 'Навігація' : 'Навигация'}</h4>
            <div className="space-y-2">
              <a
                href={`${homeWithLang}#about`}
                onClick={(event) => handleAnchorClick(event, '#about')}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                {uk ? 'Про мене' : 'Обо мне'}
              </a>
              <a
                href={`${homeWithLang}#states`}
                onClick={(event) => handleAnchorClick(event, '#states')}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                {uk ? 'З чим працюю' : 'С чем работаю'}
              </a>
              <a
                href={`${homeWithLang}#process`}
                onClick={(event) => handleAnchorClick(event, '#process')}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                {uk ? 'Як проходить консультація' : 'Как проходит консультация'}
              </a>
              <a
                href={`${homeWithLang}#cta`}
                onClick={(event) => handleAnchorClick(event, '#cta')}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                {uk ? "Зв'язатися" : 'Связаться'}
              </a>
              <a href={getLegalHref('impressum')} className="block text-white/80 hover:text-white transition-colors text-sm">
                Impressum
              </a>
              <a href={getLegalHref('datenschutz')} className="block text-white/80 hover:text-white transition-colors text-sm">
                Datenschutzerklärung
              </a>
              <a href={getLegalHref('agb')} className="block text-white/80 hover:text-white transition-colors text-sm">
                AGB
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Леся Афанасьева. {uk ? 'Усі права захищені.' : 'Все права защищены.'}
            </p>
            <a
              href={uk ? `${getHomeHref()}?lang=uk&page=admin` : `${getHomeHref()}?page=admin`}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              {uk ? 'адміністратору' : 'администратору'}
            </a>
            <a
              href="https://erstellen-websiten.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
            >
              {uk ? 'Зроблено з' : 'Сделано с'} <Heart className="w-3 h-3 text-[#D8B4A0]" fill="#D8B4A0" /> erstellen-websiten.de
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PsyFooter;
