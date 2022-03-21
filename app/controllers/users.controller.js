exports.login = async (req, res) => {
  let username=req.body.username;
  let password=req.body.password;
  let body={error:false,status:true,message:'success!'};
};
exports.changePassword = async (req, res) => {
  let oldpass=req.body.old_pass;
  let newpass=req.body.new_pass;
  let user_id=req.body.user_id;
  let body={error:false,status:true,message:'success!'};
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
