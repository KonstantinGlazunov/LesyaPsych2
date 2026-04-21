import { motion } from 'framer-motion';
import { isUk } from '../lib/lang';

const PsyHero = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const uk = isUk();

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
              {uk ? 'Російськомовний психолог у Німеччині, який також працює українською мовою' : 'Консультирующий психолог'}
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#2B2B2B] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6"
            >
              {uk
                ? 'Коли всередині тривожно і незрозуміло — разом розберемося, що з вами відбувається'
                : 'Когда внутри тревожно и непонятно — разбираемся вместе, что с вами происходит'}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#5A5A5A] text-lg mb-8 max-w-lg"
            >
              {uk
                ? 'Допомагаю розібратися в собі, знизити тривожність і відновити внутрішню опору'
                : 'Помогаю разобраться в себе, снизить тревожность и восстановить внутреннюю опору'}
            </motion.p>
            
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
                  alt={uk ? 'Леся Афанасьєва — психолог-консультант' : 'Леся Афанасьева — консультирующий психолог'}
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
