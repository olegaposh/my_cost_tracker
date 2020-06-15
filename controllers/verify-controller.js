const passport = require("passport")
const express = require("express")
const router = express.Router()
const db = require("../models")

//passport
router.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
require("../config/passport")(passport)
router.use(passport.initialize())
router.use(passport.session())

router.get("/", (req, res) => {
    
    
    console.log(req.user)
    if (req.user) {
        try{
        
            let query = {}
            query.user_id = req.user.id;
            
            //const data = await db.transaction.findAll({
            db.transaction.findAll({
                where: query,
                include: [db.user]
            }).then((result) => {
                console.log(result)
                console.log("FIRST TRY", result[0].amount);
                //console.log("SECOND TRY", result[0].transaction.amount);
               res.render("user", {userTransactions: result})
                }
            );
    
            // res.json(data);
        }catch(error) {
            console.log(error);
    
            res.status(500).send(error);
        }
        
    } else {
        res.redirect("/login");
    }
})

router.get("/login", (req, res) => {
    res.render("login");
  });

router.post("/login", passport.authenticate("local-login", {

    failureRedirect: "/login",
    successRedirect: "/"
    }))

router.get("/signup", (req, res) => {
    res.render("signup");
  });

router.post("/signup", passport.authenticate("local-signup", {

    failureRedirect: "/signup",
    successRedirect: "/"
}))

router.get("/logout", (req, res) => {

    req.logout();
    res.redirect("/");
})

module.exports = router;