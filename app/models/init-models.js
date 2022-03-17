var DataTypes = require("sequelize").DataTypes;
var _balances = require("./balances");
var _notifications = require("./notifications");
var _sessions = require("./sessions");
var _tokens = require("./tokens");
var _transactions = require("./transactions");
var _user_profiles = require("./user_profiles");
var _users = require("./users");

function initModels(sequelize) {
  var balances = _balances(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var user_profiles = _user_profiles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    balances,
    notifications,
    sessions,
    tokens,
    transactions,
    user_profiles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
