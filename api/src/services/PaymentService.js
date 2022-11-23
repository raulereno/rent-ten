const axios = require("axios");
const { MERCADOPAGO_TOKEN } = process.env;

class PaymentService {
  async createPayment(req) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: [
        {
          title: req.body.title,
          description: req.body.description,
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: req.body.quantity,
          unit_price: req.body.price,
        },
      ],

      payer: {
        name: "nombre de prueba",
        surname: "apellido de prueba",
        email: req.body.email,
        phone: {
          area_code: "11",
          Number: "4444-4444",
        },
      },
      back_urls: {
        failure: `localhost:4200/housedetail/mercadopago/failure/${req.body.houseId}/${req.body.code}`,
        pending: `localhost:4200/housedetail/mercadopago/pending/${req.body.houseId}/${req.body.code}`,
        success: `localhost:4200/housedetail/mercadopago/success/${req.body.houseId}/${req.body.code}`,
      },
      notification_url: "http://www.localhost:3001/mercadopago/notification",
      external_reference: "MP0001",
      auto_return: "all",
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        // Authorization: `Bearer APP_USR-1788256458828733-111623-c3752974fddc8b6ee0baa6eb9432daf4-1240989108`
        Authorization: `Bearer APP_USR-1788256458828733-111623-c3752974fddc8b6ee0baa6eb9432daf4-1240989108`,
      },
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_46945293@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
