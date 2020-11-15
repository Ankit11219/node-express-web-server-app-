var express = require('express');
var mymail = require('../models/mymail');
var usersmodel = require('../models/usersmodel');
var path=require('path')
var router = express.Router();
var data = "";
// usersmodel.fetchalldata('addcat',function(result){
//   data=result;
// });
 var data1 = "" 
// usersmodel.fetchalldata('addsubcat',function(result){
//   data1=result
// });
var sess;
var check1;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.unm==undefined && req.session.role!="user"){
    usersmodel.fetchdata('addcat',function(result){
      res.render('index',{'mycat':result,"mycheck":0,'unm':"",'role':""});
    })
  }
  else{
    res.redirect('/users')
  }
  
});


router.get('/viewsubcat/:catnm',function(req,res,next){
  var catnm = req.params.catnm;
  usersmodel.fetchalldata('addcat',function(result){
  data=result;
});
setTimeout(function(){
  usersmodel.fetchsubdata('addsubcat',catnm,function(result){
    if(req.session.role == 'user')
    res.render('viewsubcat',{'mycat':result,'mycat1':data,"mycheck":1,'unm':req.session.unm,'role':req.session.role});
    else if(req.session.role == 'admin')
    res.render('viewsubcat',{'mycat':result,'mycat1':data,"mycheck":1,'unm':req.session.unm,'role':req.session.role});
    else
    res.render('viewsubcat',{'mycat':result,'mycat1':data,"mycheck":0,'unm':"",'role':""})
  });
},0.002001);
});
router.get('/showpost/:catpost',function(req,res,next){
  var catpost = req.params.catpost;
  console.log(catpost);
  usersmodel.fetchsubdata('addpost',catpost,function(result){
    console.log(result);
    if(req.session.role == 'user')
    res.render('viewsubcatpost',{'mypost':result,"mycheck":1,'unm':req.session.unm,'role':req.session.role,'nm':req.session.nm});
    else if(req.session.role == 'admin')
    res.render('viewsubcatpost',{'mypost':result,"mycheck":1,'unm':req.session.unm,'role':req.session.role,'nm':"admin"});
    else
    res.render('viewsubcatpost',{'mypost':result,"mycheck":0,'unm':"",'role':"",'nm':""});
  });
});


router.all('/addpost',function(req,res,next){
  usersmodel.fetchalldata('addsubcat',function(result){
  data1=result
  if(req.session.unm==undefined && req.session.role!="user"){
    sess="";
    check1 = 0;
  }
  else{
    sess=req.session.unm;
    check1=1;
  }
  if(req.method==="GET"){
    res.render('addpost',{'result':'','mycat':data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
  }
  else{
    var data2 = req.body;
    var my_img_nm1,my_img_nm2,my_img_nm3;
    var img1 = req.files.my_img1;
    var img2 = req.files.my_img2;
    var img3 = req.files.my_img3;
    if(check1==0){
      data2.regid=0;
    }
    else{
      data2.regid=req.session.regid;
      data2.email= req.session.unm;
    }


    if(img1!=undefined && img2==undefined && img3==undefined){
      my_img_nm1=img1.name;
      data2.my_img1 = my_img_nm1;
      var des1=path.join(__dirname,'../public/uploads',my_img_nm1);
      img1.mv(des1,function(err){
        if(err)
        res.render('addpost',{'result':'Upload Failed...','mycat':data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
        else
        {
      usersmodel.postdata('addpost',data2,function(result){
        if(result)
        {
        res.render('addpost',{'result':'Post successfully uploaded',"mycat":data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
        }
         else{
        res.render('addpost',{'result':'Post upload failed',"mycat":data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});  
         }
      });
    }
  });
    } //first close
    else if(img1!=undefined && img2!=undefined && img3==undefined){
      my_img_nm1=img1.name;
      my_img_nm2=img2.name;
      data2.my_img1 = my_img_nm1;
      data2.my_img2 = my_img_nm2;
      var des1=path.join(__dirname,'../public/uploads',my_img_nm1);
      var des2=path.join(__dirname,'../public/uploads',my_img_nm2);
      img1.mv(des1,function(err){
        if(err)
        res.render('addpost',{'result':'Upload Failed.1..','mycat':data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
        else
        {
          img2.mv(des2,function(err1){
            if(err1)
            res.render('addpost',{'result':'Upload Failed.2..','mycat':data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
            else
            {
              usersmodel.postdata('addpost',data2,function(result){
                if(result)
                {
                res.render('addpost',{'result':'Post successfully uploaded',"mycat":data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
                }
                 else{
                res.render('addpost',{'result':'Post upload failed',"mycat":data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});  
                 }
              });
            }
        });
    }
  });
    } // second closed
    else if(img1!=undefined && img2!=undefined && img3!=undefined){
      my_img_nm1=img1.name;
      my_img_nm2=img2.name;
      my_img_nm3=img3.name;
      data2.my_img1 = my_img_nm1;
      data2.my_img2 = my_img_nm2;
      data2.my_img3 = my_img_nm3;
      var des1=path.join(__dirname,'../public/uploads',my_img_nm1);
      var des2=path.join(__dirname,'../public/uploads',my_img_nm2);
      var des3=path.join(__dirname,'../public/uploads',my_img_nm3);
      img1.mv(des1,function(err){
        if(err)
        res.render('addpost',{'result':'Upload Failed.1..','mycat':data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
        else
        {
          img2.mv(des2,function(err1){
            if(err1)
            res.render('addpost',{'result':'Upload Failed.2..','mycat':data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
            else
            {
              img3.mv(des3,function(err2){
                if(err2)
                res.render('addpost',{'result':'Upload Failed.3..','mycat':data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
                else
                {
                  usersmodel.postdata('addpost',data2,function(result){
                    if(result)
                    {
                    res.render('addpost',{'result':'Post successfully uploaded',"mycat":data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
                    }
                     else{
                    res.render('addpost',{'result':'Post upload failed',"mycat":data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});  
                     }
                  });
                }
              });
            }
          });
        }
      });
    }//third close
    else{
      data2.my_img1 = "dummypost.jpg";

    usersmodel.postdata('addpost',data2,function(result){
      if(result)
      {
      res.render('addpost',{'result':'Post successfully uploaded',"mycat":data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});
      }
       else{
      res.render('addpost',{'result':'Post upload failed',"mycat":data1,'myuser':sess,"mycheck":check1,'unm':req.session.unm});  
       }
    });
  }
  }
});
});


router.get('/about', function(req, res, next) {
  res.render('about');
});


router.get('/service', function(req, res, next) {
  res.render('service');
});



router.get('/loginauthentication/:emailid', function(req, res, next) {
  emailid=req.params.emailid  
  usersmodel.authenticationupdate(emailid,function(result){
    if(result)
      res.redirect('/login');
    else
    res.redirect('/register');        
  })
});


router.all('/login', function(req, res, next) {
  if(req.method=='GET')
  res.render('login',{'result':''});
  else
  {
    var data=req.body
    usersmodel.logincheck('register',data,function(result){
      //console.log(result)
      if(result.length==0)
       res.render('login',{'result':'login failed..'});  
      else
      {
        req.session.unm = result[0].unm;
        req.session.role = result[0].role;
        req.session.regid = result[0].regid;
        req.session.nm = result[0].nm;
        if(result[0].role=='admin')
        res.redirect('/admin')
        else
          res.redirect('/users')  
      } 
    })
  }  
});

router.all('/forgetpass',function(req,res,next){
  if(req.method==='GET')
  res.render('forgetpass',{result:""});
  else{
    var data3 = req.body;
    console.log(data3);
    usersmodel.manageProfile('register',data3.unm,function(result1){
      console.log(result1);
      if(result1.length!=0){
        mymail.forgetpass(result1[0].unm,result1[0].pass,function(result){
          if(result)
               res.render('forgetpass',{'result':'Check your Email Id'});
             else
               res.render('forgetpass',{'result':'Check your connection'});
        });
      }
      else{
        res.render('forgetpass',{'result':'Username doesnot exist'});
      }
    });

  }
});

router.all('/register', function(req, res, next) {
  if(req.method=='GET'){
    res.render('register',{'result':''});
    usersmodel.countRegister('register');
    
  }
  else
  {
   var data=req.body
   usersmodel.checkRegistration('register',data,function(count){
     if(count!=0){
       res.render('register',{'result':"Username Already Exists"});
     }
     else
     {
      usersmodel.userregistration('register',data,function(result){
        if(result)
        {
         mymail.sendmail(data.unm,data.pass,function(result){
             if(result)
               res.render('register',{'result':'Register successfully..'});
             else
               res.render('register',{'result':'Email id not exist..'});
         }) 
        }
         else
        res.render('register',{'result':'Registration failed..'});  
      });
     }
   });
  
  }  
});


router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/logout',function(req,res,next){
  req.session.destroy();
  res.redirect('/login');
});


module.exports = router;
