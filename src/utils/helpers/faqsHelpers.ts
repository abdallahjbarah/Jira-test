import { Faq } from '@/lib/types';

export const reshapeFaqs = (faqs: Faq[] | undefined) => {
  if (!faqs) return [];
  return faqs?.map(faq => ({
    ...faq,
    question: {
      en: faq.questionEn,
      ar: faq.questionAr,
    },
    answer: {
      en: faq.answerEn,
      ar: faq.answerAr,
    },
  }));
};
