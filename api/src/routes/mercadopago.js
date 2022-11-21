const { Router } = require("express");
const router = Router();

const mercadopago = require("mercadopago");
const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

const axios = require('axios')

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


module.exports = router;