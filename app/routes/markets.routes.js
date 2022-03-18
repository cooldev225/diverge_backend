module.exports = app => {
  const markets = require("../controllers/markets.controller.js");
  var router = require("express").Router();
  router.get("/getMarkets", markets.getMarkets);   
  router.post("/getMarkets", markets.getMarkets);   
  app.use('/api/markets', router);
};