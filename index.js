const express= require("express");
const app= express();
const path= require('path');

const bodyparser= require('body-parser'); //new
const session= require('express-session'); //new
const{v4:uuid4} =require('uuid');  //new

const router= require('./router');   //router

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs')
app.use(express.json()); //telling express we arew suing json

//load static assets-
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, '/public/assets')))

//creating unique session for evey user-
app.use(session({
    secret: uuid4(),          //creating unique id's
    resave:false,
    saveUninitialized:true
}));


//logined route-
app.use('/route', router);

//login template-
app.get('/login',function(req,res){
    res.render('base', { title : "Login System"});
});




function runMeow(){
    console.log("Meow");
}

//route and function
app.get('/',function(req,res) {
    // res.send("Hello from server");
    
    res.json({
        name: "Shrey",
        age: 20
    });

    //  res.status(200).json({
    //     name: "Shrey",
    //     age: 20
    // });
    
    // res.redirect('http://www.google.com')
}); //method
    //send to send normal text

app.post("/backend/meow/:name", function(req,res){
    //header
    //query
    //body
    console.log(req.header);
    res.send("Meow");
    console.log(req.params.name);
    
})


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})