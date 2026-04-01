import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, Users, FileCheck, CalendarCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Напишите',
    description: 'Напишите мне в WhatsApp или Telegram (или отправить голосовое сообщение). Расскажите коротко, что привело вас к психологу.'
  },
  {
    number: '02',
    icon: Users,
    title: 'Поговорим',
    description: 'Мы коротко пообщаемся, чтобы понять ваш запрос и подходит ли вам мой подход.'
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Договоримся',
    description: 'Обсудим формат, частоту и удобное время для встреч — онлайн или офлайн.'
  },
  {
    number: '04',
    icon: CalendarCheck,
    title: 'Начнём работу',
    description: 'Начинаем с первой консультации. Начинаем там, где вы сейчас находитесь.'
  }
];

const PsyProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-[#A3B18A] text-sm uppercase tracking-widest mb-4 font-medium">
            Как это работает
          </p>
          <h2 className="text-[#2B2B2B] text-2xl sm:text-3xl lg:text-4xl max-w-2xl mx-auto">
            Простые шаги, чтобы начать
          </h2>
          <p className="text-[#5A5A5A] mt-4 max-w-xl mx-auto">
            Начать легко. Вот как выглядит процесс.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-white rounded-[1.5rem] p-6 shadow-soft h-full card-hover">
                  {/* Number */}
                  <div className="text-[#D8B4A0]/30 text-5xl font-serif font-bold mb-4">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-[#A3B18A]/20 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-[#A3B18A]" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-[#2B2B2B] text-xl font-medium mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#D8B4A0]/30" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PsyProcess;
