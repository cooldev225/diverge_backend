const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes  } = require("sequelize");
const { query } = require("express");
const axios = require('axios');
exports.getMarkets = async ()=>{
  let res = [];
  let sql = "select * from tokens";
  let results = await db.sequelize.query(sql,{type: QueryTypes.SELECT});
  for(var i=0;i<results.length;i++){
    var config = {
      method: 'get',
      url: `https://data.messari.io/api/v1/assets/${results[i].symbol}/metrics`,
      headers: { }
    };
    var data={};
    try{
      data=await axios(config);
    }
    catch(e){}
    var val={
      id:results[i].id,
      symbol:results[i].symbol,
      name:results[i].name,
      logo:results[i].logo,
    }
    
    if(data.data){
      data=data.data.data;
      val.symbol=data.symbol;
      val.name=data.name;
      val.slug=data.slug;
      val.contract_addresses=data.contract_addresses;
      val.marketdata={
        price_usd:data.market_data.price_usd,
        price_btc:data.market_data.price_btc,
        price_eth:data.market_data.price_eth,
        volume_last_24_hours:data.market_data.volume_last_24_hours,
        real_volume_last_24_hours:data.market_data.real_volume_last_24_hours,
        volume_last_24_hours_overstatement_multiple:data.market_data.volume_last_24_hours_overstatement_multiple,
        percent_change_usd_last_1_hour:data.market_data.percent_change_usd_last_1_hour,
        percent_change_btc_last_1_hour:data.market_data.percent_change_btc_last_1_hour,
        percent_change_eth_last_1_hour:data.market_data.percent_change_eth_last_1_hour,
        percent_change_usd_last_24_hours:data.market_data.percent_change_usd_last_24_hours,
        percent_change_btc_last_24_hours:data.market_data.percent_change_btc_last_24_hours,
        percent_change_eth_last_24_hours:data.market_data.percent_change_eth_last_24_hours,
        percent_change_usd_last_1_hour:data.market_data.percent_change_usd_last_1_hour,
        percent_change_usd_last_1_hour:data.market_data.percent_change_usd_last_1_hour,
        last_trade_at:data.market_data.last_trade_at,
      };
      val.marketcap=data.marketcap;
    }
    
    res.push(val);
  }
  return {
    error:false,
    status:true,
    data:res
  }
};

exports.getMarketBySymbol = async (symbol='')=>{
  let sql = `select * from tokens where symbol='${symbol}'`;
  let results = await db.sequelize.query(sql,{type: QueryTypes.SELECT});
  if(results.length){
    var i=0;
    var config = {
      method: 'get',
      url: `https://data.messari.io/api/v1/assets/${results[i].symbol}/metrics`,
      headers: { }
    };
    var data={};
    try{
      data=await axios(config);
    }
    catch(e){}
    var val={
      id:results[i].id,
      symbol:results[i].symbol,
      name:results[i].name,
      logo:results[i].logo,
    }
    if(data.data){
      data=data.data.data;
      val.symbol=data.symbol;
      val.name=data.name;
      val.slug=data.slug;
      val.contract_addresses=data.contract_addresses;
      val.marketdata={
        price_usd:data.market_data.price_usd,
        price_btc:data.market_data.price_btc,
        price_eth:data.market_data.price_eth,
        volume_last_24_hours:data.market_data.volume_last_24_hours,
        real_volume_last_24_hours:data.market_data.real_volume_last_24_hours,
        volume_last_24_hours_overstatement_multiple:data.market_data.volume_last_24_hours_overstatement_multiple,
        percent_change_usd_last_1_hour:data.market_data.percent_change_usd_last_1_hour,
        percent_change_btc_last_1_hour:data.market_data.percent_change_btc_last_1_hour,
        percent_change_eth_last_1_hour:data.market_data.percent_change_eth_last_1_hour,
        percent_change_usd_last_24_hours:data.market_data.percent_change_usd_last_24_hours,
        percent_change_btc_last_24_hours:data.market_data.percent_change_btc_last_24_hours,
        percent_change_eth_last_24_hours:data.market_data.percent_change_eth_last_24_hours,
        percent_change_usd_last_1_hour:data.market_data.percent_change_usd_last_1_hour,
        percent_change_usd_last_1_hour:data.market_data.percent_change_usd_last_1_hour,
        last_trade_at:data.market_data.last_trade_at,
      };
      val.marketcap=data.marketcap;
    }
    return {
      error:false,
      status:true,
      data:val
    }
  }else{
    return {
      error:true,
      status:false,
      message:'There is no the token in server.'
    }
  }  
};