const market_model = require('../modules/market.js');
exports.getMarkets = async (req, res) => {
  //let user_id=req.body.user_id;
  let body=await market_model.getMarkets();
  res.status(200).send(body);
};
exports.getMarketBySymbol = async (req, res) => {
  let symbol=req.body.symbol;
  let body=await market_model.getMarketBySymbol(symbol);
  res.status(200).send(body);
};