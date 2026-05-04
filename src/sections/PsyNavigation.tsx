import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { getHomeHref } from '../lib/contact';
import { isUk } from '../lib/lang';

const PsyNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const uk = isUk();
  const navLinks = [
    { label: uk ? 'Головна' : 'Главная', hash: '#hero' },
    { label: uk ? 'Про мене' : 'Обо мне', hash: '#about' },
    { label: uk ? 'З чим працюю' : 'С чем работаю', hash: '#states' },
    { label: uk ? 'Як проходить консультація' : 'Как проходит консультация', hash: '#process' },
    { label: uk ? 'Контакти' : 'Контакты', hash: '#cta' },
  ];
  const baseUrl = import.meta.env.BASE_URL;
  const homeHref = getHomeHref();
  const homeWithLang = uk ? `${homeHref}?lang=uk` : homeHref;
  const blogHref = uk ? `${homeHref}?lang=uk&page=blog` : `${homeHref}?page=blog`;
  const getLangHref = (lang: 'ru' | 'uk') => {
    const params = new URLSearchParams(window.location.search);
    if (lang === 'uk') {
      params.set('lang', 'uk');
    } else {
      params.delete('lang');
    }
    const query = params.toString();
    return `${homeHref}${query ? `?${query}` : ''}${window.location.hash}`;
  };
  const ruHref = getLangHref('ru');
  const ukHref = getLangHref('uk');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const page = new URLSearchParams(window.location.search).get('page');
    if (page) {
      window.location.href = `${homeHref}${uk ? '?lang=uk' : ''}${hash}`;
      return;
    }
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.hash = hash;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F4F2]/90 backdrop-blur-md shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href={`${homeWithLang}#hero`}
              onClick={(e) => handleAnchorClick(e, '#hero')}
              className="inline-flex items-center gap-3 text-[#2B2B2B] font-serif text-lg lg:text-xl leading-tight"
            >
              <img
                src={`${baseUrl}images/lesyLogo-80.png`}
                alt="Логотип Леси Афанасьевой"
                width="80"
                height="80"
                decoding="async"
                className="h-10 w-auto"
              />
              <span>Леся Афанасьева</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.hash}
                  href={`${homeWithLang}${link.hash}`}
                  onClick={(e) => handleAnchorClick(e, link.hash)}
                  className="text-[#5A5A5A] hover:text-[#2B2B2B] transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={blogHref}
                className="text-[#5A5A5A] hover:text-[#2B2B2B] transition-colors text-sm"
              >
                {uk ? 'Блог' : 'Блог'}
              </a>
              <div className="ml-2 inline-flex items-center rounded-full border border-[#2B2B2B]/15 p-1 text-xs">
                <a
                  href={ruHref}
                  className={`rounded-full px-2 py-1 transition-colors ${!uk ? 'bg-[#2B2B2B] text-white' : 'text-[#5A5A5A] hover:text-[#2B2B2B]'}`}
                >
                  RU
                </a>
                <a
                  href={ukHref}
                  className={`rounded-full px-2 py-1 transition-colors ${uk ? 'bg-[#2B2B2B] text-white' : 'text-[#5A5A5A] hover:text-[#2B2B2B]'}`}
                >
                  UA
                </a>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#2B2B2B]"
              aria-label={uk ? 'Відкрити меню' : 'Открыть меню'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute top-0 right-0 bottom-0 w-72 bg-[#F7F4F2] shadow-xl pt-20 px-6"
            >
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.hash}
                    href={`${homeWithLang}${link.hash}`}
                    onClick={(e) => handleAnchorClick(e, link.hash)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="block py-3 text-[#2B2B2B] text-lg border-b border-[#2B2B2B]/10"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={blogHref}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                  className="block py-3 text-[#2B2B2B] text-lg border-b border-[#2B2B2B]/10"
                >
                  {uk ? 'Блог' : 'Блог'}
                </motion.a>
                <div className="pt-4 flex items-center gap-3">
                  <a
                    href={ruHref}
                    className={`rounded-full px-3 py-1 text-sm border transition-colors ${!uk ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]' : 'text-[#2B2B2B] border-[#2B2B2B]/30'}`}
                  >
                    RU
                  </a>
                  <a
                    href={ukHref}
                    className={`rounded-full px-3 py-1 text-sm border transition-colors ${uk ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]' : 'text-[#2B2B2B] border-[#2B2B2B]/30'}`}
                  >
                    UA
                  </a>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PsyNavigation;
