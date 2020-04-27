const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {mongourl} =require("./config/connection");
const Wish = require('./models/wish')

var data=[];

mongoose.connect(mongourl, {useNewUrlParser: true,useUnifiedTopology: true}, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb"); 
});

module.exports=(app)=>{
    
    app.get('/',(req,res)=>{
        res.render('home',{task:data}) 
    })

    app.get('/about',(req,res)=>{
        res.render('about') 
    })

    app.post('/sent-data',(req,res)=>{
        // data.push(req.body.name);
         console.log(data);
        const Item = new Wish({
            wish:req.body.name
        })

        Item.save().then(data=>{
            console.log("message : ",data);
        })
        res.send(JSON.stringify(req.body));
    })

    app.delete('/remove/:id',(req,res)=>{
        data = data.map(item=>{
            if(item != req.params.id)
            {
                return item
            }
        })
        //console.log(req.params.id);
        res.send(data);
    })
}