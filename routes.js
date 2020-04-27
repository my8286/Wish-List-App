const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {mongourl} =require("./config/connection");
//const Wish = require('./models/wish') may not not when require in multiple file and use when model should have exported from model>wish.js
const Wish = mongoose.model('Wishes');



// To establish the connection with mogoDB cloud 
mongoose.connect(mongourl, {useNewUrlParser: true,useUnifiedTopology: true}, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb"); 
});
mongoose.set('useFindAndModify', false);
module.exports=(app)=>{
   
    // To render the home.ejs page route
    app.get('/',(req,res)=>{
        Wish.find({}).then(data=>{
            res.render('home',{task:data})
        })  
    })

    // To render the about.ejs page route
    app.get('/about',(req,res)=>{
        res.render('about') 
    })
    
    // To add the wish into db route
    app.post('/sent-data',(req,res)=>{
        const Item = new Wish({
            wish:req.body.name
        })

        Item.save().then(data=>{
            console.log("Data saved : ",data);
        }).catch(err=>{
            throw err
        })
        res.send(JSON.stringify(req.body));
    })

    // To delete the wish from the dataset route
    app.delete('/remove/:id',(req,res)=>{
        Wish.findOneAndRemove({wish:req.params.id}).then(data=>{
            console.log('Deleted');
            res.send(data);
        }).catch(err=>{
            throw err
        })
        
    })
}