const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port:3306,
  dialect: dbConfig.dialect,
  dialectOptions: {
    //socketPath: '/var/run/mysqld/mysqld.sock',
            //useUTC: true,
            //dateFirst: 1
  },
  //operatorsAliases: false,
  logging: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
//sequelize-auto -h localhost -d btppzsmy_test_application -u root -p --dialect -o app/models
//const db = {};
const initModels = require("./init-models.js");
const db=initModels(sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;