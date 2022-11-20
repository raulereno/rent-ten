const { Router } = require("express");
const router = Router();

const mercadopago = require("mercadopago");
const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

const axios = require('axios')

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel

mercadopago.configure({
	access_token: "APP_USR-1788256458828733-111623-c3752974fddc8b6ee0baa6eb9432daf4-1240989108",
});

router.post("/", function (req, res, next) {
    return res.json({
      "/payment": "generates a payment link",
      "/subscription": "generates a subscription link"
    });
  });
  
  router.post("/payment", function (req, res, next) {
    PaymentInstance.getPaymentLink(req, res);
  });
  
  router.post("/subscription", function (req, res, next) {
    PaymentInstance.getSubscriptionLink(req, res);
  });


  router.get("/asdasd", async (req, res) => {

    try {
      axios.get("https://api.mercadopago.com/merchant_orders/1240989108-865f01f6-2df6-4ccb-9f43-1947c0f98bdf", {
      headers: {Authorization: `Bearer APP_USR-1788256458828733-111623-c3752974fddc8b6ee0baa6eb9432daf4-1240989108`}
    }).then(res => console.log(res.data))

      return res.status(200).json(payment.data)

    } catch (error)  {
        console.log(error)
        res.status(400).json(error.data)
    }
  })
  
module.exports = router;



// router.post("/create_preference", (req, res) => {


    // 	let preference = {
    // 		items: [
    // 			{
    // 				title: req.body.description,
    // 				unit_price: Number(req.body.price),
    // 				quantity: Number(req.body.quantity),
    // 			}
    // 		],
    // 		back_urls: {
    // 			"success": "http://localhost:3001/mercadopago/feedback",
    // 			"failure": "http://localhost:3001/mercadopago/feedback",
    // 			"pending": "http://localhost:3001/mercadopago/feedback"
    // 		},
    // 		auto_return: "approved",
    // 	};
    
    // 	mercadopago.preferences.create(preference)
    // 		.then(function (response) {
    // 			res.json({
    // 				id: response.body.id
    // 			});
    // 		}).catch(function (error) {
    // 			console.log(error);
    // 		});
    // });
    
    // router.get('/feedback', function (req, res) {
    // 	res.json({
    // 		Payment: req.query.payment_id,
    // 		Status: req.query.status,
    // 		MerchantOrder: req.query.merchant_order_id
    // 	});
    // });