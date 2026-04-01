import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Send, Heart } from 'lucide-react';

const PsyCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const whatsappLink = "https://wa.me/?text=Здравствуйте, хочу записаться на консультацию";
  const telegramLink = "https://t.me/";

  return (
    <section ref={ref} className="w-full py-20 lg:py-28 bg-[#F7F4F2] px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#A3B18A] to-[#8B9A72] p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white text-2xl sm:text-3xl lg:text-4xl mb-4 max-w-2xl mx-auto"
            >
              Если мой подход откликается — напишите мне
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto"
            >
              Мы спокойно обсудим вашу ситуацию и найдём лучший путь вперёд вместе.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2B2B2B] px-6 py-3.5 rounded-full font-medium btn-hover"
              >
                <MessageCircle className="w-5 h-5" />
                Написать в WhatsApp
              </a>
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-3.5 rounded-full font-medium hover:bg-white/30 transition-colors"
              >
                <Send className="w-5 h-5" />
                Написать в Telegram
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PsyCTA;
