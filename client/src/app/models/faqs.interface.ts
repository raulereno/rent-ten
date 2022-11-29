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
    question: 'Cual es el metodo de pago para poder reservar',
    response: 'El metodo de pago es mercadopago, es seguro y confiable. ',
  },
  {
    question: 'Que se necesita para poder reservar un alojamiento',
    response:
      'Estar registrado en nuestra pagina, verificar su mail y poseer una cuenta de MercadoPago',
  },
  {
    question: 'Como puedo publicar mi alojamiento?',
    response:
      'Registrate en nuestra pagina, verifica tu mail y completa el formulario de creación de alojamiento',
  },
  {
    question: 'Para otras preguntas comunicate con nosotros',
    response: '',
  },
];
