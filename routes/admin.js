var express = require('express');
var path=require('path')
var usersmodel = require('../models/usersmodel');
var router = express.Router();


router.use(function(req,res,next){
  if(req.session.unm==undefined || req.session.role!='admin')
  {
    console.log('invalid user please login first')
    res.redirect('/logout')
  }
  next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  usersmodel.fetchdata('addcat',function(result){
    res.render('index',{'mycat':result,"mycheck":1,'unm':req.session.unm,'role':req.session.role});
  })
  //res.render('adminhome',{'unm':req.session.unm,'role':req.session.role});  
});


router.all('/addsubcategory', function(req, res, next) {
  var data=''
  usersmodel.fetchalldata('addcat',function(result){
      data=result
  })
  setTimeout(function(){
    if(req.method=='GET')
  {
    res.render('addsubcat',{'result':'','mycat':data});
    usersmodel.countRegister('addsubcat');
  }
  else
  {
    var cat_nm=req.body.cat_nm
    var sub_cat_nm=req.body.sub_cat_nm
    var myimg=req.files.cat_img
    var cat_img_nm=Date()+'-'+myimg.name
    

    
    var des=path.join(__dirname,'../public/uploads',cat_img_nm)
    myimg.mv(des,function(err){
      if(err)
      res.render('addsubcat',{'result':'Upload Failed...','mycat':data})
      else
      {
        usersmodel.addsubcategory(cat_nm,sub_cat_nm,cat_img_nm,function(result){
          if(result)
            res.render('addsubcat',{'result':'Category Added...','mycat':data})
          else
          res.render('addsubcat',{'result':'Category Not Added...','mycat':data})  
        })
      }  
    })
  }
},0.00201);   
});




router.all('/addcategory', function(req, res, next) {
  if(req.method=='GET'){
  res.render('addcat',{'result':''})
  usersmodel.countRegister('addcat');
  }
  else
  {
    var cat_nm=req.body.cat_nm
    var myimg=req.files.cat_img
    var cat_img_nm=Date()+'-'+myimg.name
    

    
    var des=path.join(__dirname,'../public/uploads',cat_img_nm)
    myimg.mv(des,function(err){
      if(err)
      res.render('addcat',{'result':'Upload Failed...'})
      else
      {
        usersmodel.addcategory(cat_nm,cat_img_nm,function(result){
          if(result)
            res.render('addcat',{'result':'Category Added...'})
          else
          res.render('addcat',{'result':'Category Not Added...'})  
        })
      }  
    })
  }  
});
  router.all('/manageusers',function(req,res,next){
    if(req.method=='GET'){
      usersmodel.manage('register',function(result){
        res.render('manageusers',{'data1':result});
      });
    }
    else{
      var data=req.body
      console.log(data);
      usersmodel.blockUser('register',data.S1,function(result){
        if(result){
          usersmodel.manage('register',function(result1){
            // console.log(result);
             res.render('manageusers',{'data1':result1});
           });
        }
      })
      
    }
  });
  router.all('/managepost',function(req,res,next){
    if(req.method=='GET'){
      usersmodel.manage('addpost',function(result){
       // console.log(result);
       result;
        res.render('managepost',{'data1':result});
      });
    }
    else{
      var data=req.body
      usersmodel.deletePost('addpost',data.s,function(result){
        if(result){
          usersmodel.manage('addpost',function(result1){
            // console.log(result);
             res.render('managepost',{'data1':result1});
           });
        }
      })
      
    }
  });
  router.all('/pass',function(req,res,next){
    if(req.method=="GET"){
      res.render("changepass",{"result":""});
    }
    else{
      data = req.body;
    }
  });



module.exports = router;
