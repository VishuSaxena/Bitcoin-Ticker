//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
  console.log("Server is started at port 3000");
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var crypto=req.body.crypto;
  var fiat=req.body.fiat;
  var amount=req.body.amount;
  var options={
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
    from:crypto,
    to:fiat,
    amount:amount}
  };
  request(options,function(error,response,body){
    var data=JSON.parse(body);
    var price=data.price;
    res.send("The amount is "+price+ fiat);
  });
});
