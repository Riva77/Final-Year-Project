const router = require("express").Router();

const { khaltiCallback } = require("../../services/payment.service.js");

router.get("/", khaltiCallback);

module.exports = router;
