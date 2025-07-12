
import type { TranslationKey } from '@/lib/locales';

export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'faq1',
    questionKey: 'faq_q_booking_how',
    answerKey: 'faq_a_booking_how',
  },
  {
    id: 'faq2',
    questionKey: 'faq_q_safety_measures',
    answerKey: 'faq_a_safety_measures',
  },
  {
    id: 'faq3',
    questionKey: 'faq_q_what_to_bring',
    answerKey: 'faq_a_what_to_bring',
  },
  {
    id: 'faq4',
    questionKey: 'faq_q_drone_policy',
    answerKey: 'faq_a_drone_policy',
  },
  {
    id: 'faq5',
    questionKey: 'faq_q_payment_methods',
    answerKey: 'faq_a_payment_methods',
  },
  {
    id: 'faq6',
    questionKey: 'faq_q_weather_cancellation',
    answerKey: 'faq_a_weather_cancellation',
  },
];

    