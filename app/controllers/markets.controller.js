const market_model = require('../modules/market.js');
exports.getMarkets = async (req, res) => {
  //let user_id=req.body.user_id;
  let body=await market_model.getMarkets();
  res.status(200).send(body);
};