module.exports = app => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();
  router.post("/login", users.login);   
  router.post("/getBestCustomers", users.getBestCustomers);   
  router.post("/register", users.register);   
  router.post("/getProfile", users.getProfile);   
  router.post("/updateAvatar", users.updateAvatar);   
  router.post("/getAvatar", users.getAvatar);
  router.post("/getIdByEmail", users.getIdByEmail);
  router.post("/getSlug", users.getSlug);
  router.post("/findUsersProfile", users.findUsersProfile);
  router.post("/updateEmail", users.updateEmail);
  router.post("/updateRecoveryEmail", users.updateRecoveryEmail);
  router.post("/updatePassword", users.updatePassword);
  router.post("/updateProfile", users.updateProfile);
  router.post("/updateAvatar", users.updateAvatar);
  router.post("/sendMagicLink", users.sendMagicLink);
  router.post("/updateSecurityQuesion", users.updateSecurityQuesion);
  app.use('/api/users', router);
};