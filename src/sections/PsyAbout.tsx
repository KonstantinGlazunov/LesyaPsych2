import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Heart, Sparkles } from 'lucide-react';
import { isUk } from '../lib/lang';

const PsyAbout = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const baseUrl = import.meta.env.BASE_URL;
  const uk = isUk();

  const credentials = [
    { icon: Award, text: uk ? 'Психолог-консультант' : 'Психолог-консультант' },
    { icon: Award, text: uk ? 'Профільне навчання та регулярне підвищення кваліфікації' : 'Завершаю профильное обучение и продолжаю повышение квалификации' },
    { icon: Heart, text: uk ? 'Спеціалізація: тривожність і життєві переходи' : 'Специализация: тревожность и жизненные переходы' },
    { icon: Sparkles, text: uk ? 'Понад 2 роки практики' : 'Более 2 лет практики' }
  ];

  return (
    <section ref={ref} className="w-full py-20 lg:py-28 bg-[#F7F4F2] px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#A3B18A]/15 rounded-[2rem] blur-2xl" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[1.5rem] shadow-softer"
            >
              <img
                src={`${baseUrl}images/understanding.jpeg`}
                alt="Леся Афанасьева на консультации"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-[1rem] shadow-soft p-4 sm:p-5"
            >
              <p className="text-[#D8B4A0] text-3xl sm:text-4xl font-serif">2+</p>
              <p className="text-[#5A5A5A] text-sm">{uk ? 'роки практики' : 'лет практики'}</p>
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#A3B18A] text-sm uppercase tracking-widest mb-4 font-medium">
              {uk ? 'Про мене' : 'Обо мне'}
            </p>
            <h2 className="text-[#2B2B2B] text-2xl sm:text-3xl lg:text-4xl mb-6">
              Леся Афанасьева
            </h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-[#5A5A5A]">
                {uk
                  ? 'Я — психолог-консультант. Допомагаю людям розбиратися з тривожністю, проживати життєві зміни та знаходити вихід з емоційних глухих кутів. Мій підхід — м’який, безоцінковий, із фокусом на створенні безпечного простору.'
                  : 'Я — консультирующий психолог. Помогаю людям разбираться в тревожности, переживать жизненные изменения и находить выход из эмоциональных тупиков. Мой подход — мягкий, безоценочный, с фокусом на создание безопасного пространства.'}
              </p>
              <p className="text-[#5A5A5A]">
                {uk
                  ? 'Я не даю готових відповідей — я допомагаю зрозуміти, що насправді з вами відбувається. Разом ми розберемося в патернах, які вас утримують, і знайдемо нові способи бути із собою та світом.'
                  : 'Я не даю готовых ответов — я помогаю понять, что на самом деле происходит с вами. Вместе мы разберёмся в паттернах, которые удерживают вас, и найдём новые способы быть с собой и миром.'}
              </p>
              <p className="text-[#5A5A5A]">
                {uk
                  ? 'Якщо ви переживаєте тривожність, відчуваєте розгубленість або проходите через важливі зміни в житті — я поруч, щоб підтримати вас на шляху до кращого розуміння себе та внутрішнього спокою.'
                  : 'Если вы переживаете тревожность, чувствуете растерянность или проходите через важные изменения в жизни — я рядом, чтобы поддержать вас на пути к большему пониманию себя и внутреннему спокойствию.'}
              </p>
            </div>
            
            {/* Credentials */}
            <div className="space-y-3">
              {credentials.map((cred, index) => {
                const IconComponent = cred.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#D8B4A0]/20 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-[#D8B4A0]" />
                    </div>
                    <span className="text-[#2B2B2B] text-sm sm:text-base">{cred.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PsyAbout;
