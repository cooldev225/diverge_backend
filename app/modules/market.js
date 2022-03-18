const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes  } = require("sequelize");
const { query } = require("express");
exports.getMarkets = async ()=>{
  let res = [];
  let sql = "select * from tokens";
  let results = await db.sequelize.query(sql,{type: QueryTypes.SELECT});
  results.forEach(token => {
    res.push({
      symbol:token.symbol
    });
  });
  //https://data.messari.io/api/v1/assets/btc/metrics
  return {
    error:false,
    status:true,
    data:res
  }
};