
const express = require("express");
const app = express();
var data=[];
module.exports=(app)=>{
    
    app.get('/',(req,res)=>{
        res.render('home',{task:data}) 
    })

    app.get('/about',(req,res)=>{
        res.render('about') 
    })

    app.post('/sent-data',(req,res)=>{
        data.push(req.body.name);
        console.log(data);
        res.send(JSON.stringify(req.body));
    })

    app.delete('/remove/:id',(req,res)=>{
        data = data.map(item=>{
            if(item != req.params.id)
            {
                return item
            }
        })
        console.log(req.params.id);
        res.send(data);
    })
}