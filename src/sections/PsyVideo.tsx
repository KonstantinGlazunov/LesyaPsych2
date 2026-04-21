import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { isUk } from '../lib/lang';

const PsyVideo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const baseUrl = import.meta.env.BASE_URL;
  const uk = isUk();

  return (
    <section ref={ref} className="w-full py-20 lg:py-28 bg-[#FAF8F6] px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
 >
          <p className="text-[#A3B18A] text-sm uppercase tracking-widest mb-4 font-medium">
            {uk ? 'Знайомство' : 'Знакомство'}
          </p>
          <h2 className="text-[#2B2B2B] text-2xl sm:text-3xl lg:text-4xl max-w-2xl mx-auto">
            {uk ? 'Коротко про те, чим я можу бути корисною' : 'Коротко о том, чем я могу быть полезна'}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-softer bg-[#2B2B2B] aspect-video">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              controls
              preload="metadata"
              poster={`${baseUrl}images/trust.jpeg`}
            >
              <source src={`${baseUrl}images/presentation.mp4`} type="video/mp4" />
              {uk ? 'Ваш браузер не підтримує відтворення відео.' : 'Ваш браузер не поддерживает воспроизведение видео.'}
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PsyVideo;
