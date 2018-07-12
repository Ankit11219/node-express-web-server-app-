var express = require('express');
var router = express.Router();
var path=require('path')
var usersmodel = require('../models/usersmodel');

router.use(function(req,res,next){
  if(req.session.unm==undefined || req.session.role!='user')
  {
    console.log('invalid user please login first')
    res.redirect('/logout')
  }
  next()
})
var sess;
var check1;

/* GET users listing. */
router.get('/', function(req, res, next) {
  usersmodel.fetchdata('addcat',function(result){
    res.render('index',{'mycat':result,"mycheck":1,'unm':req.session.unm,'role':req.session.role});
  })
});

router.all('/manageprofile', function(req, res, next) {
  if(req.method=='GET'){
    console.log("session",req.session.unm);
    usersmodel.manageProfile('register',req.session.unm,function(result){
      console.log("userprofile",result)
      res.render('manageprofile',{'result':'',"userProfile":result});
    });
    
  }
  else
  {
   var data=req.body
   data.unm = req.session.unm;
   console.log(data);
   usersmodel.updateProfile('register',data,function(result){
     if(result){
    usersmodel.manageProfile('register',req.session.unm,function(result1){
      // console.log("userprofile",result)
      res.render('manageprofile',{'result':'Update Successfully',"userProfile":result1});
    });
  }
  else{
    usersmodel.manageProfile('register',req.session.unm,function(result1){
      // console.log("userprofile",result)
      res.render('manageprofile',{'result':'Update Failed',"userProfile":result1});
    });
  }
   });
   
  
  }  
});

module.exports = router;
