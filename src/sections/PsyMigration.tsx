import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plane, Users, Home, Globe } from 'lucide-react';

const challenges = [
  {
    icon: Plane,
    title: 'Стресс эмиграции',
    description: 'Эмоциональная цена расставания с привычным миром: дом, работа, люди.'
  },
  {
    icon: Users,
    title: 'Потеря опоры',
    description: 'Расстояние от близких, от привычной системы поддержки и понимания.'
  },
  {
    icon: Home,
    title: 'Сложности адаптации',
    description: 'Новая культура, языковой барьер, чувство чуждости и непринадлежности.'
  },
  {
    icon: Globe,
    title: 'Вопросы идентичности',
    description: 'Кто я в этом новом месте? Как соединить прошлое с настоящим?'
  }
];

const PsyMigration = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
    <section ref={ref} className="w-full py-20 lg:py-28 bg-[#F7F4F2] px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#A3B18A] text-sm uppercase tracking-widest mb-4 font-medium">
              Для эмигрантов
            </p>
            <h2 className="text-[#2B2B2B] text-2xl sm:text-3xl lg:text-4xl mb-6">
              Понимаю опыт переезда
            </h2>
            <p className="text-[#5A5A5A] mb-8">
              Как русскоязычный психолог, работающий с эмигрантами, я глубоко понимаю особые вызовы, с которыми вы сталкиваетесь. Переезд в другую страну — это не просто логистика, это глубокое эмоциональное путешествие.
            </p>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {challenges.map((challenge, index) => {
                const IconComponent = challenge.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-[1rem] p-5 shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#D8B4A0]/20 flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5 text-[#D8B4A0]" />
                    </div>
                    <h4 className="text-[#2B2B2B] font-medium mb-2">{challenge.title}</h4>
                    <p className="text-[#5A5A5A] text-sm">{challenge.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#D8B4A0]/15 rounded-[2rem] blur-2xl" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[1.5rem] shadow-softer"
            >
              <img
                src="/images/kolage.jpeg"
                alt="Баланс и гармония"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            
            {/* Quote overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 right-6 bg-white rounded-[1rem] shadow-soft p-5"
            >
              <p className="text-[#2B2B2B] italic text-sm">
                «Вам не нужно проходить этот путь в одиночку. Я рядом, чтобы помочь найти опору в новом мире.»
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PsyMigration;
