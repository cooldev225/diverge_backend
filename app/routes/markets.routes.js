module.exports = app => {
  const markets = require("../controllers/markets.controller.js");
  var router = require("express").Router();
  router.post("/getTokens", markets.getTokens);
  router.get("/getMarkets", markets.getMarkets);   
  router.post("/getMarkets", markets.getMarkets);
  router.get("/getMarketBySymbol", markets.getMarketBySymbol);   
  router.post("/getMarketBySymbol", markets.getMarketBySymbol);
  app.use('/api/markets', router);
};