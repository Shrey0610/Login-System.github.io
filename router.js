var express= require('express');
var router= express.Router();   //creating router inside the file

const credential = {
    email: "admin@gmail.com",
    password : "admin123"
};

//login-
router.post('/logined',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/Home');
        // res.end('Login successfull!!!!')
    }
    else{
        res.end("Invalid Username")
    }
});

//route for home-
router.get('/Home',(req,res)=>{
    if(req.session.user){
        res.render('Home', {user: req.session.user});
    }
    else{
        res.send("Unauthorised user!!");
    }
});

router.get('/logout', (req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error!!!");
        }
        else{
            res.render('base', {title : "Welcome", logout:"logout successfully!!"});
        }
    })
});

module.exports= router;