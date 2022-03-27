const db = require("../models");
const User = db.users;
const UserProfile = db.user_profiles;
const Op = db.Sequelize.Op;
const { QueryTypes  } = require("sequelize");
const { query } = require("express");
const axios = require('axios');
exports.login = async (req, res) => {
  res.header={
    "Access-Control-Allow-Origin":"*"
  }
  let body=null;
  var condition = {};
  let email = req.body.email;
  let password = req.body.password; 
  //var salt = bcrypt.genSaltSync(8);
  //password = bcrypt.hashSync(password, salt);
  //password = password.replace('$2b$', '$2y$');
  condition.where = {
    email: {
      [Op.eq]: `${email}`
    }
  };
  if(!await User.count(condition))body={code:2,msg:'Email is not exist!'};
  else{
    await User.findAll(condition)
    .then(data => {
      for (let row of data) {
        var dbpass=row.dataValues.password;
        dbpass = dbpass.replace('$2y$', '$2b$');
        if(bcrypt.compareSync(password, dbpass)){
          body={code:0,msg:'success',user:row};    
          break;
        }
      }      
      if(body==null)body={code:1,msg:'Password is wrong!'};
    }).catch(err => {
      console.error(err);
    });

    if(body.code==0){
      var img=await user_model.getAvatar(body.user.id);
      body={...body,avatar:img};
    }
    
  }
  res.status(200).send(body);
};
exports.register = async (req, res) => {
  let body=null;
  var condition = {};
  let email = req.body.email;
  let password = req.body.password; 
  let fullname = req.body.name;  
  let gender = req.body.gender!=null&&(req.body.gender==2||req.body.gender==='female')?2:1;
  var salt = bcrypt.genSaltSync(8);
  password = bcrypt.hashSync(password, salt);
  password = password.replace('$2b$', '$2y$');
  var namesplit=fullname.split(' ');
  let fname=namesplit[0];
  let lname=namesplit.length>1?namesplit[1]:'';
  let slug=(fname+lname).toLowerCase().replace(' ','-').replace('/','-').replace('&','').replace('--','-').replace(',','-').replace('amp;','');
  slug=await user_model.getSlug(slug,1,slug);
  let birth=req.body.birth!=null?req.body.birth:' ';
  condition.where = {
    email: {
      [Op.eq]: `${email}`
    }
  };
  if(await User.count(condition))
    body={code:1,msg:'Email is exist already!'};
  else{
    await User.create({
      role_id: 5,
      first_name: fname,
      last_name: lname,
      gender: gender,
      slug:slug,
      email:email,
      password:password,
      dob:birth,
      username:email,
      recovery_email:'',
      salt:salt,
      remember_code:'',
      activation_code:'',
      phone:'',
      country:'',
      state:'',
      city:'',
      address:'',
      current_city:'',
      last_login:0,
      ip_address:'',
      forgotten_password_code:'',
      forgotten_password_time:0,
      login_status:1,
      status:1,
      created_at:new Date(),
      updated_at:new Date(),
      created_by:0,
      updated_by:0,
      logintime:'',
      comments:'',
    })
    .then(data => {
      body={ code:0,msg:'success',user:{
        id:data.id,
        email:data.email,
        slug:data.slug,
        username:data.username,
      },avatar:avatar[gender-1]};
    }).catch(err => {
      console.error(err)
    });
  }
  if(body==null)body={ code:2,msg:'error' };
  res.status(200).send(body);
};
exports.getProfile = async (req, res) => {
  let body=null;
  var condition = {};
  let slug = req.body.slug;
  let token = req.body.token;
  let loggeduserid=0;
  if(token!=null&&token!=''){
    let decoded = jwtDecode(token);
    loggeduserid=decoded.data.id;
  }  
  condition.where = {
    slug: {
      [Op.eq]: `${slug}`
    }
  };
  if(!await User.count(condition))
    body={code:1,msg:'User is not exist!'};
  else{
    let user={};
    await User.findAll(condition)
    .then(data => {
      for (let row of data) {
        user=row;
        break;
      }
    });
    condition.where = {
      user_id: {
        [Op.eq]: `${user.id}`
      }
    };
    let profile={};
    if(!await UserProfile.count(condition)){
      await UserProfile.create({
        user_id:user.id,
        intersted_new:1,
        profile_color:'',
        about:'',
        work_status:1,
        views:0,
        intrests:'',
        hobbies:'',
        goal:'',
        work:'',
        latitude:0,
        longitude:0,
        qualification:'',
        profession:'',
        higher_eduction:'',
        school_name:'',
        graduation:'',
        collage_name:'',
        post_graduation:'',
        post_graduation_collage:'',
        image:'',
        thumb_image:'',
        cover_image_id:'',
        links:'',
        employment_status:0,
        working_company_name:'',
        designation:'',
        buisness_name:'',
        buisness_position:'',
        website_url:'',
        facebook_page_url:'',
        instagram_id:'',
        twiter_id:'',
        status:1,
        created_at:new Date(),
        updated_at:new Date(),
        created_by:user.id,
        updated_by:user.id,
        user_activity:'',
      })
    }
    await UserProfile.findAll(condition)
      .then(data => {
        for (let row of data) {
          profile=row;
          break;
        }
      });
    user.isLoggedinUser=loggeduserid==user.id?true:false;
    user.isBlocked=(await db.blocked_user.count({where:{
      [Op.or]:[
        {
          user_id:{[Op.eq]:user.id},
          blocked_userid:{[Op.eq]:loggeduserid}
        },
        {
          user_id:{[Op.eq]:loggeduserid},
          blocked_userid:{[Op.eq]:user.id}
        }
      ]      
    }}));
    user.totalPostCount=await post_model.getprofileTotalPost(user.id);
    var is_user_contact=0;
    var mutual_friends=0;
    var is_user_friend=0;
    if(loggeduserid&&user.id!==loggeduserid){
      is_user_contact=await user_model.getloggedUserInContactWithCurrentUser(user.id,loggeduserid);
      mutual_friends=await user_model.getloggedUserIsMutualFriendCurrentUser(user.id,loggeduserid);
      is_user_friend=await user_model.getloggedUserFriendWithCurrentUser(user.id,loggeduserid);
    }
    
    featureditems=[];
    newimagesitems=[];
    privilage_to='';
    image_video_privacy=user_model.getUsergImageVideoPrivacy(user.id);    
    if(image_video_privacy&&image_video_privacy.privilage_to){
      privilage_to=image_video_privacy.privilage_to;
    }
    if(user.id===loggeduserid||privilage_to===''||privilage_to===1||(privilage_to===2&&(is_user_contact===1||mutual_friends===1))||(privilage_to===3&&mutual_friends===1)||(privilage_to===5&&(is_user_contact===1||is_user_friend===1))||(privilage_to === 6 && is_user_contact === 1) || (privilage_to === 7 && is_user_friend === 1) || (privilage_to === 8 && user_id === loggeduserid)){
      featureditems=await user_model.getfeaturedImageVideo(user.id,loggeduserid);
      newimagesitems=await user_model.getNewImageVideo(user.id,loggeduserid);
    }
    
    recomendedvideos=[]
    recomended_groups=[]
    if(loggeduserid){
      recomendedvideos=await media_model.getRecomendedvideo(4,'offsite',loggeduserid);
      recomended_groups=await group_model.getRecomendedGroupsDetails(3,'offsite');
    }else{
      recomendedvideos=await media_model.getRecomendedvideo(4);
      recomended_groups=await group_model.getRecomendedGroupsDetails(3);
    }

    mutualFriends=await user_model.getUserMutualFriends(user.id,loggeduserid);
    recommended=await user_model.findRecommendedUSer(10);

    if(loggeduserid!==user.id){
      await user_model.updateProfileViews(loggeduserid,user.id)
    }

    body={
      code:0,msg:'success',
      user:user,
      isLoggedinUser:user.isLoggedinUser,
      isBlocked:user.isBlocked,
      totalPostCount:user.totalPostCount,
      profile:profile,
      mutualFriends:mutualFriends,
      recommended:recommended,
      is_user_contact:is_user_contact,
      mutual_friends:mutual_friends,
      is_user_friend:is_user_friend,
      featureditems:featureditems,
      newimagesitems:newimagesitems,
      recomendedvideos:recomendedvideos,
      recomended_groups:recomended_groups,
      avatar:profile.thumb_image!=''?profile.thumb_image:profile.image!=''?profile.image:avatar[user.gender-1]
    }
  }
  if(body==null)body={ code:2,msg:'error' };
  res.status(200).send(body);
};
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
exports.getAvatar = async (user_id)=>{
  let condition={};
  condition.where = {
    user_id: {
      [Op.eq]: `${user_id}`
    }
  };
  UserProfile.findAll(condition)
  .then(data => {
    if(data.length){
      if(data[0].image!=null&&data[0].image!=''){
        return data[0].image;
      }
      else if(data[0].thumb_image!=null&&data[0].thumb_image!=''){
        return data[0].thumb_image;
      }
    }else{
      let user=User.findByPk(user_id);
      if(user!=null&&user.gender==1)return '/assets/avatars/male.jpg';
      else if(user!=null&&user.gender==2)return '/assets/avatars/female.jpg';
    }
  });
  return '/assets/avatars/male.jpg';
};
exports.getIdByEmail = async (email)=>{
  let condition={};
  condition.where = {
    email: {
      [Op.eq]: `${email}`
    }
  };
  await User.findAll(condition)
  .then(data => {
    if(data.length>0){
      return data[0].id;
    }
  });
  return 0;
};
exports.getSlug = async (slug,cnt,original)=>{
  let condition={};
  condition.where = {
    slug: {
      [Op.eq]: `${slug}`
    }
  };
  if(await User.count(condition)){
    slug=await this.getSlug(original+cnt,cnt+1,original);
  }
  return slug;
}
exports.findUsersProfile = async (term='',loggeduserid=0,type=1) => {
  var segments=term.split('/[\s]+/');
  var query='select users.id as user_id,\
        users.slug as slug,\
        users.first_name as fname,\
				users.gender as gender,\
				users.last_name as lname,\
				users_profile.thumb_image as thumbimage,\
				users_profile.image as image,\
				users_profile.about_search_privacy as about_search_privacy \
        from users \
        left join users_profile on users_profile.user_id=users.id \
        where users.role_id=5 ';
  var condition='';
  for(var segment of segments){
    condition+=(condition===''?'':'or ')+"users.first_name like '%"+segment+"%' or users.last_name like '%"+segment+"%' ";
  }
  query+="and ("+condition+" or users.email LIKE '%"+term+"%' OR users.state LIKE '%"+term+"%' OR users.city LIKE '%"+term+"%' OR users.address LIKE '%"+term+"%' OR users_profile.school_name LIKE '%"+term+"%' OR users_profile.working_company_name LIKE '%"+term+"%' OR users_profile.buisness_name LIKE '%"+term+"%')"
  var results = await db.sequelize.query(query,{type: QueryTypes.SELECT}); 
  var profiles=[];
  for(value of results){
    if(value.user_id===loggeduserid)continue;
    var friendStatus = this.getloggedUserFriendWithCurrentUser(value.user_id,loggeduserid);
    var contactStatus = this.getloggedUserInContactWithCurrentUser(value.user_id,loggeduserid);
    if(!friendStatus&&value.about_search_privacy===1&&!contactStatus){
      continue;
    }
    query = 'SELECT * FROM user_friends WHERE user_id='+loggeduserid+' AND friend_id='+value.user_id;
    var user_friendship_status=await db.sequelize.query(query,{type: QueryTypes.SELECT}); 
    if(user_friendship_status.length){
      value.current_friendship_status=user_friendship_status[0].friendship_status;
    }else{
      value.current_friendship_status = 0;
    }
    profiles.push(value);
  }
  return profiles;
}
exports.updateEmail = async (user_id,email="",password="") => {
  if(!user_id||email==='')return 1;
  var bcrypt = require('bcrypt');
  var dbpass=(await db.users.findByPk(user_id)).password;
  dbpass = dbpass.replace('$2y$', '$2b$');
  if(!bcrypt.compareSync(password, dbpass)){
    return 2;
  }
  var query="update users set email='"+email+"' WHERE id="+user_id;
  await db.sequelize.query(query,{type: QueryTypes.UPDATE}); 
  return 0;
}
exports.updateRecoveryEmail = async (user_id,recovery_email="",password="") => {
  if(!user_id||recovery_email==='')return 1;
  var bcrypt = require('bcrypt');
  var dbpass=(await db.users.findByPk(user_id)).password;
  dbpass = dbpass.replace('$2y$', '$2b$');
  if(!bcrypt.compareSync(password, dbpass)){
    return 2;
  }
  var query="update users set recovery_email='"+recovery_email+"' WHERE id="+user_id;
  await db.sequelize.query(query,{type: QueryTypes.UPDATE}); 
  return 0;
}
exports.updatePassword = async (user_id,password="",new_password="") => {
  var bcrypt = require('bcrypt');
  var dbpass=(await db.users.findByPk(user_id)).password;
  dbpass = dbpass.replace('$2y$', '$2b$');
  if(!bcrypt.compareSync(password, dbpass)){
    return 1;
  }
  var query="update users set password='"+new_password+"' WHERE id="+user_id;
  await db.sequelize.query(query,{type: QueryTypes.UPDATE}); 
  return 0;
}
exports.updateSecurityQuesion = async (user_id,quesions="") => {
  var query="update users_profile set reset_security_question='"+JSON.stringify(quesions)+"' WHERE user_id="+user_id;
  await db.sequelize.query(query,{type: QueryTypes.UPDATE}); 
  return 0;
}