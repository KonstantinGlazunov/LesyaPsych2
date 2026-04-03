import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { TELEGRAM_LINK, WHATSAPP_LINK } from '../lib/contact';

type QuizTag = 'anxiety' | 'support_loss' | 'exhaustion' | 'uncertainty' | 'mixed';

const quizQuestions = [
  {
    title: 'Как вы чаще всего чувствуете себя в последнее время?',
    options: [
      { text: 'Как будто внутри много напряжения, и я не могу расслабиться', tag: 'anxiety' },
      { text: 'Как будто я держусь из последних сил и сил почти не осталось', tag: 'exhaustion' },
      { text: 'Как будто я не до конца понимаю, что со мной происходит и чего я хочу', tag: 'uncertainty' },
    ],
  },
  {
    title: 'Что сейчас дается вам труднее всего?',
    options: [
      { text: 'Успокоиться и перестать прокручивать мысли', tag: 'anxiety' },
      { text: 'Опереться на себя и почувствовать устойчивость', tag: 'support_loss' },
      { text: 'Понять, в какую сторону двигаться дальше', tag: 'uncertainty' },
    ],
  },
  {
    title: 'Как вы обычно реагируете на сложные ситуации?',
    options: [
      { text: 'Начинаю переживать заранее и думать о худшем', tag: 'anxiety' },
      { text: 'Теряюсь и как будто не чувствую под ногами опоры', tag: 'support_loss' },
      { text: 'Стараюсь справиться, но потом чувствую сильную внутреннюю усталость', tag: 'exhaustion' },
    ],
  },
  {
    title: 'Что больше всего похоже на ваше состояние сейчас?',
    options: [
      { text: 'Внутри слишком много тревоги и напряжения', tag: 'anxiety' },
      { text: 'Мне сложно собраться, как будто я внутренне рассыпался(ась)', tag: 'support_loss' },
      { text: 'Я будто застрял(а) между “уже не так” и “еще не понимаю как”', tag: 'uncertainty' },
    ],
  },
  {
    title: 'Как у вас сейчас с решениями?',
    options: [
      { text: 'Даже простые решения вызывают лишние переживания', tag: 'anxiety' },
      { text: 'Мне трудно решать, потому что я не чувствую уверенности внутри', tag: 'support_loss' },
      { text: 'Мне сложно решать, потому что я не до конца понимаю, чего хочу', tag: 'uncertainty' },
    ],
  },
  {
    title: 'Как вы чувствуете себя к концу дня?',
    options: [
      { text: 'Уставшим(ей), но мысли все равно не отпускают', tag: 'anxiety' },
      { text: 'Опустошенным(ой), как будто на себя совсем не осталось ресурса', tag: 'exhaustion' },
      { text: 'С ощущением, что день прошел, а ясности так и не появилось', tag: 'uncertainty' },
    ],
  },
  {
    title: 'Что вам сейчас нужнее всего?',
    options: [
      { text: 'Больше внутреннего спокойствия', tag: 'anxiety' },
      { text: 'Почувствовать опору и устойчивость', tag: 'support_loss' },
      { text: 'Понять себя и свои следующие шаги', tag: 'uncertainty' },
    ],
  },
];

const resultCopy: Record<QuizTag, {
  title: string;
  short: string;
  gentle: string;
  support: string;
  contact: string;
}> = {
  anxiety: {
    title: 'Повышенная тревога',
    short:
      'Похоже, сейчас внутри у вас много напряжения, внутреннего беспокойства и попыток все удержать под контролем. Даже если внешне вы справляетесь, внутри может не хватать спокойствия и ощущения безопасности.',
    gentle:
      'Это не диагноз, а только ориентир, который помогает внимательнее посмотреть на свое состояние и его возможные причины.',
    support:
      'Тревога часто усиливается в периоды неопределенности, перегрузки или внутреннего конфликта. С этим можно работать бережно и постепенно, возвращая себе больше ясности и устойчивости.',
    contact:
      'Если вам откликается этот результат, вы можете написать мне — мы спокойно обсудим, что сейчас с вами происходит и какая поддержка может быть полезной.',
  },
  support_loss: {
    title: 'Потеря внутренней опоры',
    short:
      'Похоже, сейчас вам непросто чувствовать устойчивость внутри. Может быть ощущение, что вы стали сильнее зависеть от обстоятельств, чужих реакций или внешней поддержки, а на себя опереться сложнее, чем раньше.',
    gentle:
      'Это не диагноз, а мягкая попытка обозначить то состояние, в котором вы можете находиться сейчас.',
    support:
      'Такое состояние нередко возникает после сложных отношений, сильных перемен, кризисов или длительного внутреннего напряжения. Постепенно внутреннюю опору можно восстанавливать — через понимание себя, своих чувств и своих границ.',
    contact:
      'Если вы чувствуете, что сейчас вам не хватает устойчивости, вы можете написать мне. Мы спокойно посмотрим на вашу ситуацию и поймем, с чего лучше начать. Это бесплатно.',
  },
  exhaustion: {
    title: 'Эмоциональное истощение',
    short:
      'Похоже, вы долго держались, справлялись и выдерживали многое, и сейчас внутренние ресурсы могли заметно снизиться. Даже простые вещи в таком состоянии могут требовать больше сил, чем обычно.',
    gentle:
      'Это не диагноз, а способ мягко описать возможное текущее состояние, если вы чувствуете сильную усталость и внутреннее опустошение.',
    support:
      'Иногда истощение накапливается постепенно и становится заметным не сразу. С этим важно обращаться бережно — без давления на себя и без ожидания, что “надо просто собраться”.',
    contact:
      'Если вы узнали себя в этом описании, вы можете написать мне. Иногда уже первый разговор помогает немного снизить внутреннее напряжение и лучше понять, что с вами происходит.',
  },
  uncertainty: {
    title: 'Период внутренней неопределенности',
    short:
      'Похоже, вы находитесь в периоде, когда старые ориентиры уже не работают так, как раньше, а новые еще не стали понятными. Это может ощущаться как растерянность, потеря направления или сложность услышать себя.',
    gentle:
      'Это не диагноз, а ориентир, который помогает заметить: возможно, сейчас вам особенно важно прояснить свои чувства, смыслы и внутренние опоры.',
    support:
      'Периоды неопределенности бывают у многих людей, особенно во время перемен, кризисов, переезда или переосмысления своей жизни. Это непростой, но важный этап, который можно пройти не в одиночку.',
    contact:
      'Если вам близко это состояние, вы можете написать мне. Мы спокойно разберем вашу ситуацию и попробуем понять, что сейчас для вас действительно важно.',
  },
  mixed: {
    title: 'Сочетание состояний',
    short:
      'Сейчас у вас может сочетаться сразу несколько состояний, и это нормально. Иногда напряжение, усталость и неясность идут рядом и требуют внимания в разных местах.',
    gentle:
      'Это не диагноз, а ориентир, который помогает мягко отметить разные стороны вашего самочувствия.',
    support:
      'Если откликается сразу несколько тем, можно начать с самого живого и чувствительного. Постепенно появится больше ясности и опоры.',
    contact:
      'Если хотите, вы можете написать мне — мы спокойно разберем, что сейчас происходит и с чего будет легче начать.',
  },
};

const computeResultTag = (answers: QuizTag[]): QuizTag => {
  const counts = answers.reduce<Record<QuizTag, number>>((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, { anxiety: 0, support_loss: 0, exhaustion: 0, uncertainty: 0, mixed: 0 });

  const maxCount = Math.max(counts.anxiety, counts.support_loss, counts.exhaustion, counts.uncertainty);
  const topTags = (['anxiety', 'support_loss', 'exhaustion', 'uncertainty'] as QuizTag[]).filter(
    (tag) => counts[tag] === maxCount
  );

  if (topTags.length === 1) {
    return topTags[0];
  }

  const tail = answers.slice(-3);
  const tailCounts = topTags.reduce<Record<QuizTag, number>>((acc, tag) => {
    acc[tag] = tail.filter((item) => item === tag).length;
    return acc;
  }, { anxiety: 0, support_loss: 0, exhaustion: 0, uncertainty: 0, mixed: 0 });

  const tailMax = Math.max(...topTags.map((tag) => tailCounts[tag] || 0));
  const tailLeaders = topTags.filter((tag) => tailCounts[tag] === tailMax);

  return tailLeaders.length === 1 ? tailLeaders[0] : 'mixed';
};

type PsyQuizProps = {
  autoOpen?: boolean;
};

const PsyQuiz = ({ autoOpen }: PsyQuizProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizTag[]>([]);
  const [resultTag, setResultTag] = useState<QuizTag>('anxiety');

  const currentQuestion = useMemo(() => quizQuestions[currentIndex], [currentIndex]);

  const resetQuiz = () => {
    setStep('intro');
    setCurrentIndex(0);
    setAnswers([]);
    setResultTag('anxiety');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetQuiz();
    }
  };

  const handleStart = () => {
    resetQuiz();
    setStep('quiz');
  };

  const hasAutoOpenedRef = useRef(false);
  useEffect(() => {
    if (autoOpen && !hasAutoOpenedRef.current) {
      hasAutoOpenedRef.current = true;
      setIsOpen(true);
      setStep('intro');
    }
  }, [autoOpen]);

  const handleAnswer = (tag: QuizTag) => {
    const nextAnswers = [...answers, tag];
    if (currentIndex >= quizQuestions.length - 1) {
      setAnswers(nextAnswers);
      setResultTag(computeResultTag(nextAnswers));
      setStep('result');
      return;
    }
    setAnswers(nextAnswers);
    setCurrentIndex((prev) => prev + 1);
  };

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
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-[#2B2B2B] px-6 py-3.5 rounded-full font-medium btn-hover"
              >
                Пройти тест
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden sm:rounded-2xl">
          <div className="bg-gradient-to-br from-[#F7EEE9] to-[#FDFBF9] p-6 sm:p-8">
            {step === 'intro' && (
              <div className="space-y-5">
                <DialogHeader className="text-left">
                  <DialogTitle className="text-2xl sm:text-3xl text-[#2B2B2B]">
                    Короткое описание теста
                  </DialogTitle>
                </DialogHeader>
                <p className="text-[#4B4B4B] text-sm sm:text-base leading-relaxed">
                  Этот тест поможет вам внимательнее посмотреть на свое текущее состояние и заметить,
                  что сейчас требует поддержки и внимания.
                </p>
                <p className="text-[#4B4B4B] text-sm sm:text-base leading-relaxed">
                  Он не ставит диагнозов, а дает ориентир, с чем может быть связано ваше внутреннее
                  напряжение или неясность.
                </p>
                <p className="text-[#4B4B4B] text-sm sm:text-base leading-relaxed">
                  Долго не думайте, выбирайте ближайший к вам вариант ответа.
                </p>
                <div>
                  <button
                    onClick={handleStart}
                    className="inline-flex items-center gap-2 bg-[#2B2B2B] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1F1F1F] transition-colors"
                  >
                    Начнем!
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {step === 'quiz' && currentQuestion && (
              <div className="space-y-5">
                <div className="text-sm text-[#7A6B63]">
                  Вопрос {currentIndex + 1} из {quizQuestions.length}
                </div>
                <h3 className="text-xl sm:text-2xl text-[#2B2B2B] font-medium">
                  {currentQuestion.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.text}
                      onClick={() => handleAnswer(option.tag as QuizTag)}
                      className="text-left bg-white/80 hover:bg-white transition-colors border border-[#E6DDD6] rounded-2xl px-5 py-4 text-[#3B3B3B] text-sm sm:text-base shadow-sm"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'result' && (
              <div className="space-y-5">
                <div className="text-sm text-[#7A6B63]">Ваш результат</div>
                <h3 className="text-xl sm:text-2xl text-[#2B2B2B] font-semibold">
                  {resultCopy[resultTag].title}
                </h3>
                <div className="max-h-[55vh] overflow-y-auto pr-1 space-y-4 text-[#4B4B4B] text-sm sm:text-base leading-relaxed">
                  <p>{resultCopy[resultTag].short}</p>
                  <p>{resultCopy[resultTag].gentle}</p>
                  <p>{resultCopy[resultTag].support}</p>
                  <p>{resultCopy[resultTag].contact}</p>
                </div>

                <div className="space-y-3 text-center">
                  <div className="text-sm sm:text-base font-medium text-[#2B2B2B]">
                    Написать или отправить голосовое сообщение
                  </div>
                  <div className="flex flex-row flex-wrap gap-3 justify-center">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-sm hover:brightness-95 transition"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 32 32"
                        className="w-7 h-7"
                        fill="currentColor"
                      >
                        <path d="M19.11 17.21c-.28-.14-1.62-.8-1.87-.9-.25-.09-.44-.14-.62.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.37-1.64-1.53-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48h-.53c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.03 2.82 1.17 3.02c.14.19 2.02 3.07 4.9 4.31.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.55-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.53-.32ZM16 4.8c-6.18 0-11.2 5.02-11.2 11.2 0 1.97.52 3.9 1.5 5.6L4.8 27.2l5.79-1.5c1.64.9 3.48 1.38 5.41 1.38 6.18 0 11.2-5.02 11.2-11.2S22.18 4.8 16 4.8Zm0 20.1c-1.75 0-3.46-.49-4.94-1.42l-.35-.22-3.43.89.92-3.34-.23-.35a9.22 9.22 0 0 1-1.44-4.98c0-5.11 4.16-9.26 9.27-9.26 5.11 0 9.26 4.15 9.26 9.26 0 5.11-4.15 9.27-9.26 9.27Z" />
                      </svg>
                    </a>
                    <a
                      href={TELEGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram"
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2AABEE] text-white shadow-sm hover:brightness-95 transition"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="w-7 h-7"
                        fill="currentColor"
                      >
                        <path d="M21.95 4.55a1.2 1.2 0 0 0-1.27-.17L2.9 11.26a1.2 1.2 0 0 0 .13 2.25l4.83 1.47 1.85 5.49c.15.45.67.61 1.03.32l2.7-2.17 4.94 3.64c.42.31 1.02.08 1.12-.45l3.21-16.9a1.2 1.2 0 0 0-.76-1.37Zm-3.07 3.02-9.14 7.6c-.28.23-.43.58-.4.94l.33 3.27-1.35-4.01 10.88-7.8a.4.4 0 0 1 .5.62l-.82 1.38Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PsyQuiz;
