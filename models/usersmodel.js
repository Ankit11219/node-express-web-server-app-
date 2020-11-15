var db=require('./conn');
var i;
    function countRegister(tbl_nm){
        db.collection(tbl_nm).find().count().then(function(count){
            i=count;
        });
    }
    function checkRegistration(tbl_name,data,cb){
        db.collection(tbl_name).find({'unm':data.unm}).count().then(function(result){
            console.log(result);
            cb(result);
        })
    }
 function userregistration(tbl_nm,data,cb)
{
    
    data.regid= ++i;
    data.status = 0;
    data.role="user";
    db.collection(tbl_nm).insertOne(data,function(err,result){
        if(err)
        console.log(err)
     else
        cb(result) 
    });
}


function logincheck(tbl_nm,data,cb)
{
    db.collection(tbl_nm).find({'unm':data.unm,'pass':data.pass,'status':1}).toArray(function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)   
    });
    // var query="select * from "+tbl_nm+" where unm='"+data.unm+"' && pass='"+data.pass+"' && status=1" 
}

function authenticationupdate(emailid,cb)
{
    db.collection('register').update({'unm':emailid},{$set:{"status":1}},function(err,result){
        if(err)
            console.log(err)
        else
            cb(result)  
    });
   // var query="update register set status=1 where unm='"+emailid+"'"
}

function addcategory(cat_nm,cat_img_nm,cb)
{
    //var query="insert into addcat values(NULL,'"+cat_nm+"','"+cat_img_nm+"')"
    db.collection('addcat').insertOne({"cat_id":++i,"cat_nm":cat_nm,"cat_img":cat_img_nm},function(err,result){
        if(err)
        console.log(err)
     else
        cb(result) 
    });
}

function addsubcategory(cat_nm,sub_cat_nm,cat_img_nm,cb)
{
   // var query="insert into addsubcat values(NULL,'"+cat_nm+"','"+sub_cat_nm+"','"+cat_img_nm+"')"
   db.collection('addsubcat').insertOne({"sub_cat_id":++i,"cat_nm":cat_nm,"sub_cat_nm":sub_cat_nm,"sub_cat_img":cat_img_nm},function(err,result){
       if(err)
       console.log(err);
       else
       cb(result);
   })
}

function fetchdata(tbl_nm,cb)
{
    // var query="select * from "+tbl_nm+" order by cat_id desc limit 0,9"
    db.collection(tbl_nm).find().sort({'cat_id':-1}).limit(9).toArray(function(err,result){
        if(err)
        console.log(err)
    else
        cb(result) 
    });
}
function fetchsubdata(tbl_nm,cat_nm,cb)
{
    // var query="select * from "+tbl_nm+" where cat_nm='"+cat_nm+"' order by sub_cat_id desc limit 0,9"
    db.collection(tbl_nm).find({"cat_nm":cat_nm}).toArray(function(err,result){
        if(err)
        console.log(err)
    else
        cb(result)   
    })
}

function fetchalldata(tbl_nm,cb)
{
    // var query="select * from "+tbl_nm
    db.collection(tbl_nm).find().limit(9).toArray(function(err,result){
        if(err)
        console.log(err)
    else
        cb(result) 
    });
}
function postdata(tbl_nm,data,cb){
    // var query="insert into "+tbl_nm+" values(NULL,NULL'"+data.title+"','"+data.cat_nm+"','"+data.description+"',"+data.price+",'"+data.myimg1+"','"+data.myimg2+"','"+data.myimg3+"','"+data.address+"','"+data.email+"','"+data.mob+"','"+data.city+"')"
    // con.query(query,function(err,result){
        db.collection(tbl_nm).insertOne(data,function(err,result){
        if(err)
            console.log(err)
        else
            cb(result);  
    });
}
function manage(tbl_nm,cb){
    db.collection(tbl_nm).find().toArray(function(err,result){
        if(err)
            console.log(err);
        else
        cb(result);
    });
}
function manageuserpost(tbl_nm,regid,cb){
    db.collection(tbl_nm).find({"regid":regid}).toArray(function(err,result){
        if(err)
            console.log(err);
        else
        cb(result);
    });
}
function manageProfile(tbl_name,data,cb){
    db.collection(tbl_name).find({"unm":data}).toArray(function(err,result){
        if(err)
        console.log(err);
    else
    cb(result);
});
}
function updateProfile(tbl_name,data,cb){
    db.collection(tbl_name).update({'unm':data.unm},{$set:{"nm":data.nm,"pass":data.pass,"address":data.address,"city":data.city,"mob":data.mob}}).then(function(result){
        cb(result);
    });
    }
function deletePost(tbl_name,data,cb){
    db.collection(tbl_name).remove({'title':data},function(err,result){
        if(err)
            console.log(err);
        else
            cb(result);
    })
}
var s1;
function blockUser(tbl_name,data,cb){
   
    db.collection(tbl_name).find({"unm":data}).toArray().then(function(result1){
            if(result1[0].status==1)
            s1=0;
            else
            s1=1;
    });
    setTimeout(function(){
    db.collection('register').update({'unm':data},{$set:{"status":s1}}).then(function(result){
            cb(result)  
    });
},0.700);
}

module.exports={manageuserpost:manageuserpost,updateProfile:updateProfile,manageProfile:manageProfile,blockUser:blockUser,deletePost:deletePost,postdata:postdata,checkRegistration:checkRegistration,manage:manage,countRegister:countRegister,fetchsubdata:fetchsubdata,fetchalldata:fetchalldata,fetchdata:fetchdata,addsubcategory:addsubcategory,addcategory:addcategory,authenticationupdate:authenticationupdate,logincheck:logincheck,userregistration:userregistration}
