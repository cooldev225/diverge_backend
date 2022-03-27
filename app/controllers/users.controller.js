const user_model = require('../modules/user.js');
exports.login = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.login();
  res.status(200).send(body);
};
exports.register = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.register();
  res.status(200).send(body);
};
exports.getProfile = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.getProfile();
  res.status(200).send(body);
};
exports.getBestCustomers = async (req, res) => {
  let body=await user_model.getBestCustomers();
  res.status(200).send(body);
};
exports.getAvatar = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.getAvatar();
  res.status(200).send(body);
};
exports.getIdByEmail = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.getIdByEmail();
  res.status(200).send(body);
};
exports.getSlug = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.getSlug();
  res.status(200).send(body);
};
exports.findUsersProfile = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.findUsersProfile();
  res.status(200).send(body);
};
exports.updateEmail = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.updateEmail();
  res.status(200).send(body);
};
exports.updateRecoveryEmail = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body=await user_model.updateRecoveryEmail();
  res.status(200).send(body);
};
exports.updatePassword = async (req, res) => {
  let oldpass=req.body.old_pass;
  let newpass=req.body.new_pass;
  let user_id=req.body.user_id;
  let body=await user_model.updatePassword();
  res.status(200).send(body);
};
exports.updateProfile = async (req, res) => {
  let first_name=req.body.first_name;
  let last_name=req.body.last_name;
  let gender=req.body.gender;
  let job=req.body.job;
  let birthday=req.body.birthday;
  let mobile=req.body.mobile;
  let address=req.body.address;
  //cookieString
  let body={error:false,status:true,message:'success!'};
};
exports.updateAvatar = async (req, res) => {
  let file = req.body.file;
  let width = req.body.width;
  let height = req.body.height;
  if(width==null)width=300;
  if(height==null)height=300;
  let body={error:false,status:true,message:'success!'}; 
};
exports.sendMagicLink = async (req, res) => {
  let body={error:false,status:true,message:'success!'}; 
};
exports.updateSecurityQuesion = async (req, res) => {
  let body={error:false,status:true,message:'success!'}; 
};