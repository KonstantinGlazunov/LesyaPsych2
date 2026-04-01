import { motion } from 'framer-motion';
import { TELEGRAM_LINK, WHATSAPP_LINK } from '../lib/contact';

const PsyHero = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="min-h-screen w-full flex items-center bg-[#F7F4F2] pt-20 pb-16 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A3B18A] text-sm uppercase tracking-widest mb-4 font-medium"
            >
              Консультирующий психолог
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#2B2B2B] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
            >
              Когда внутри тревожно и непонятно — разбираемся вместе, что с вами происходит
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#5A5A5A] text-lg mb-8 max-w-lg"
            >
              Помогаю разобраться в себе, снизить тревожность и восстановить внутреннюю опору
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-3 text-center sm:text-left"
            >
              <div className="text-sm sm:text-base font-medium text-[#2B2B2B]">
                Написать или отправить голосовое сообщение
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-sm hover:brightness-95 transition"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    className="w-7 h-7"
                    fill="currentColor"
                  >
                    <path d="M19.11 17.21c-.28-.14-1.62-.8-1.87-.9-.25-.09-.44-.14-.62.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.37-1.64-1.53-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48h-.53c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.03 2.82 1.17 3.02c.14.19 2.02 3.07 4.9 4.31.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.55-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.53-.32ZM16 4.8c-6.18 0-11.2 5.02-11.2 11.2 0 1.97.52 3.9 1.5 5.6L4.8 27.2l5.79-1.5c1.64.9 3.48 1.38 5.41 1.38 6.18 0 11.2-5.02 11.2-11.2S22.18 4.8 16 4.8Zm0 20.1c-1.75 0-3.46-.49-4.94-1.42l-.35-.22-3.43.89.92-3.34-.23-.35a9.22 9.22 0 0 1-1.44-4.98c0-5.11 4.16-9.26 9.27-9.26 5.11 0 9.26 4.15 9.26 9.26 0 5.11-4.15 9.27-9.26 9.27Z" />
                  </svg>
                </a>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2AABEE] text-white shadow-sm hover:brightness-95 transition"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-7 h-7"
                    fill="currentColor"
                  >
                    <path d="M21.95 4.55a1.2 1.2 0 0 0-1.27-.17L2.9 11.26a1.2 1.2 0 0 0 .13 2.25l4.83 1.47 1.85 5.49c.15.45.67.61 1.03.32l2.7-2.17 4.94 3.64c.42.31 1.02.08 1.12-.45l3.21-16.9a1.2 1.2 0 0 0-.76-1.37Zm-3.07 3.02-9.14 7.6c-.28.23-.43.58-.4.94l.33 3.27-1.35-4.01 10.88-7.8a.4.4 0 0 1 .5.62l-.82 1.38Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#D8B4A0]/20 rounded-[2rem] blur-2xl" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-[1.5rem] shadow-softer"
              >
                <img
                  src={`${baseUrl}images/trust.jpeg`}
                  alt="Леся Афанасьева — консультирующий психолог"
                  className="w-full max-w-md lg:max-w-lg h-[28rem] sm:h-[32rem] object-cover object-[center_20%]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PsyHero;
