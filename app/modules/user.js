const db = require("../models");
const Op = db.Sequelize.Op;
const { QueryTypes  } = require("sequelize");
const { query } = require("express");
const axios = require('axios');
exports.getBestCustomers = async ()=>{
  let res = [];
  let sql = "select a.* from users a left join user_profiles b on a.id=b.user_id";
  let results = await db.sequelize.query(sql,{type: QueryTypes.SELECT});
  return {
    error:false,
    status:true,
    data:results
  }
};