var mongoose=require('mongoose')

var url = "mongodb://localhost/meanbatch121"

mongoose.connect(url,function(err){
    if(err)
    console.log(err);
    else
    console.log("connect successfully");
});
db = mongoose.connection;
module.exports=db; 