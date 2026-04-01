import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

const PsyVideo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Знакомство
          </p>
          <h2 className="text-[#2B2B2B] text-2xl sm:text-3xl lg:text-4xl max-w-2xl mx-auto">
            Коротко о том, чем я могу быть полезна
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-softer bg-[#2B2B2B] aspect-video">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2B2B2B] to-[#3D3D3D]">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D8B4A0] flex items-center justify-center shadow-lg btn-hover"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="white" />
              </motion.button>
            </div>
            
            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white/80 text-sm sm:text-base">
                Нажмите, чтобы посмотреть вводное видео
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PsyVideo;
