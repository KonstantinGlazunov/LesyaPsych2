import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ClipboardCheck, ArrowRight } from 'lucide-react';

const PsyQuiz = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-20 lg:py-28 bg-[#FAF8F6] px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#D8B4A0] to-[#C9A08C] p-8 sm:p-12 lg:p-16"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
            >
              <ClipboardCheck className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>
            
            {/* Content */}
            <div className="text-center lg:text-left flex-1">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white text-2xl sm:text-3xl mb-3"
              >
                Не уверены, что с вами происходит?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/80 text-base sm:text-lg mb-6"
              >
                Пройдите короткую диагностику (2 минуты), чтобы лучше понять своё состояние
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-white text-[#2B2B2B] px-6 py-3.5 rounded-full font-medium btn-hover"
              >
                Пройти тест
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PsyQuiz;
