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
   // console.log("session",req.session.unm);
    usersmodel.manageProfile('register',req.session.unm,function(result){
      console.log("userprofile",result)
      res.render('manageprofile',{'result':'',"userProfile":result,'unm':req.session.unm,'pass': req.session.pass});
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
      //  console.log("userprofile result",result)
       console.log("userprofile result",result1)
      res.render('manageprofile',{'result':'Update Successfully',"userProfile":result1,'unm':req.session.unm,'pass': req.session.pass});
    });
  }
  else{
    usersmodel.manageProfile('register',req.session.unm,function(result1){
       console.log("userprofile failed",result)
       console.log("userprofile failed",result1)
      res.render('manageprofile',{'result':'Update Failed',"userProfile":result,'unm':req.session.unm,'pass': req.session.pass});
    });
  }
   });
   
  
  }  
});

router.all('/managepost',function(req,res,next){
  if(req.method=='GET'){
    usersmodel.manageuserpost('addpost',req.session.regid,function(result){
     // console.log(result);
      res.render('managepostuser',{'data1':result,'unm':req.session.unm});
    });
  }
  else{
    var data=req.body
    console.log('data',data);
    usersmodel.deletePost('addpost',data.s,function(result){
      if(result){
        usersmodel.manageuserpost('addpost',req.session.regid,function(result1){
          // console.log(result);
           res.render('managepostuser',{'data1':result1,'unm':req.session.unm});
         });
      }
    })
    
  }
});

module.exports = router;


