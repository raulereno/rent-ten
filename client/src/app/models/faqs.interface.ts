export interface Faqs {
  question: string;
  response: string;
}

export interface MessageChat {
  message: string;
  type: number;
  socketId?: string;
  user?: string;
}

export interface UserQuestion {
  mail: string;
  message: string;
}

export const FAQS: Faqs[] = [
  {
    question: 'What do i need to reserve a place?',
    response: 'You need to registered and verified on our page',
  },
  {
    question: 'How can i publish my own housing?',
    response:
      'Register on our page, verify your e-mail and then, complete the "Become a Host" form',
  },
  {
    question: 'What is the payment method used in this website?',
    response: 'The payment method is MercadoPago, it is safe and trusted!',
  },
  {
    question: 'For any other questions you can contact us by e-mail!',
    response: '',
  },
];
