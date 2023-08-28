
const express = require("express");

const https=require("https");

const bodyparser= require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html")

})
app.post("/",function(req,res){

    


    const city=req.body.cityname;
    const urll="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ac389a7f8d0bf74f320177aa478af110&units=metric";
    https.get(urll,function(response){
        console.log(response.statusCode);


        response.on("data",function(data){
            var wd=JSON.parse(data);

            const icon =wd.weather[0].icon;
            const temp=wd.main.temp;
            const wdes = wd.weather[0].description;
            const iu = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            
            res.write("<h1>Weather currently is "+wdes+"</h1>");
            res.write("<p>current temp is "+temp+"<p>");
            res.write("<img src="+iu+">");
            
            
            
            res.send();
            
        })
    })


    
})







app.listen(3000,function(){
    console.log("started");
})