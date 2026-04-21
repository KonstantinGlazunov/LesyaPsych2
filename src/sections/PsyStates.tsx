import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, UserX, GitBranch, Zap, CircleDot } from 'lucide-react';
import { isUk } from '../lib/lang';

const PsyStates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const baseUrl = import.meta.env.BASE_URL;
  const uk = isUk();
  const states = [
    {
      id: 1,
      title: uk ? 'Тривожність' : 'Тревожность',
      description: uk
        ? 'Постійне занепокоєння, внутрішнє напруження, відчуття, що все виходить з-під контролю.'
        : 'Постоянное беспокойство, внутреннее напряжение, ощущение, что всё выходит из-под контроля.',
      icon: Brain,
      image: 'images/window.jpeg'
    },
    {
      id: 2,
      title: uk ? 'Втрата себе' : 'Потеря себя',
      description: uk
        ? 'Відчуття відірваності від себе справжнього, своїх цінностей і сенсів.'
        : 'Ощущение оторванности от себя настоящего, своих ценностей и смыслов.',
      icon: UserX,
      image: 'images/window2.jpeg'
    },
    {
      id: 3,
      title: uk ? 'Складність із вибором' : 'Сложности с выбором',
      description: uk
        ? 'Параліч перед ухваленням рішень, страх помилитися, постійні сумніви.'
        : 'Паралич перед принятием решений, страх ошибиться, постоянные сомнения.',
      icon: GitBranch,
      image: 'images/sad.jpeg'
    },
    {
      id: 4,
      title: uk ? 'Емоційне перевантаження' : 'Эмоциональная перегрузка',
      description: uk
        ? 'Коли емоцій занадто багато і не вдається ні зрозуміти їх, ні висловити.'
        : 'Когда эмоций слишком много, и не получается ни понять их, ни выразить.',
      icon: Zap,
      image: 'images/konflikt.jpeg'
    },
    {
      id: 5,
      title: uk ? 'Порожнеча' : 'Пустота',
      description: uk
        ? 'Відчуття внутрішньої порожнечі, відсутність мотивації, нездатність радіти.'
        : 'Ощущение внутренней пустоты, отсутствие мотивации, неспособность радоваться.',
      icon: CircleDot,
      image: 'images/body.jpeg'
    }
  ];

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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-[#A3B18A] text-sm uppercase tracking-widest mb-4 font-medium">
            {uk ? 'З чим працюю' : 'С чем работаю'}
          </p>
          <h2 className="text-[#2B2B2B] text-2xl sm:text-3xl lg:text-4xl max-w-2xl mx-auto">
            {uk ? 'Впізнаєте себе в одному з цих станів?' : 'Узнаёте себя в каком-то из этих состояний?'}
          </h2>
          <p className="text-[#5A5A5A] mt-4 max-w-xl mx-auto">
            {uk ? 'Це поширені переживання. Ви не самі — і є шлях пройти через них.' : 'Это распространённые переживания. Вы не одни — и есть путь через них.'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {states.map((state) => {
            const IconComponent = state.icon;
            return (
              <motion.div
                key={state.id}
                variants={itemVariants}
                className="group relative bg-white rounded-[1.5rem] overflow-hidden shadow-soft card-hover"
              >
                {/* Image */}
                <div className="h-40 overflow-hidden">
                  <img
                    src={`${baseUrl}${state.image}`}
                    alt={state.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <div className="w-10 h-10 rounded-full bg-[#D8B4A0]/20 flex items-center justify-center mb-3">
                    <IconComponent className="w-5 h-5 text-[#D8B4A0]" />
                  </div>
                  <h3 className="text-[#2B2B2B] text-lg font-medium mb-2">
                    {state.title}
                  </h3>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed">
                    {state.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PsyStates;
