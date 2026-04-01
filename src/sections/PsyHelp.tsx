import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

const transformations = [
  {
    id: 1,
    before: 'Постоянная тревога и беспокойство',
    after: 'Внутреннее спокойствие и ясность',
    image: 'images/image_b87f5b.jpg',
    imageClass: 'object-[center_20%] scale-110',
    imageHoverClass: 'group-hover:scale-[1.15]'
  },
  {
    id: 2,
    before: 'Ощущение потери себя и растерянность',
    after: 'Ощущение целостности и направления',
    image: 'images/relax.jpeg'
  },
  {
    id: 3,
    before: 'Переполненность эмоциями',
    after: 'Эмоциональная устойчивость и баланс',
    image: 'images/konflikt.jpeg'
  },
  {
    id: 4,
    before: 'Сложности с принятием решений',
    after: 'Уверенность в своих выборах',
    image: 'images/doit.jpeg'
  }
];

const PsyHelp = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const baseUrl = import.meta.env.BASE_URL;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section ref={ref} className="w-full py-20 lg:py-28 bg-[#FAF8F6] px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-[#A3B18A] text-sm uppercase tracking-widest mb-4 font-medium">
            Результат работы
          </p>
          <h2 className="text-[#2B2B2B] text-2xl sm:text-3xl lg:text-4xl max-w-2xl mx-auto">
            Что меняется в процессе нашей работы
          </h2>
          <p className="text-[#5A5A5A] mt-4 max-w-xl mx-auto">
            Терапия — это путь трансформации. Вот к чему мы можем прийти вместе.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {transformations.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative bg-white rounded-[1.5rem] overflow-hidden shadow-soft card-hover"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Image */}
                <div className="self-stretch overflow-hidden">
                  <img
                    src={`${baseUrl}${item.image}`}
                    alt={item.after}
                    className={`w-full h-full object-cover transition-transform duration-500 ${item.imageHoverClass ?? 'group-hover:scale-105'} ${item.imageClass ?? ''}`}
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  {/* Before */}
                  <div className="mb-4">
                    <p className="text-[#5A5A5A] text-xs uppercase tracking-wider mb-2">Было</p>
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[#2B2B2B] text-sm">{item.before}</p>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex justify-center my-3">
                    <ArrowRight className="w-5 h-5 text-[#D8B4A0]" />
                  </div>
                  
                  {/* After */}
                  <div>
                    <p className="text-[#A3B18A] text-xs uppercase tracking-wider mb-2">Станет</p>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#A3B18A] flex-shrink-0 mt-0.5" />
                      <p className="text-[#2B2B2B] font-medium text-sm">{item.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PsyHelp;
