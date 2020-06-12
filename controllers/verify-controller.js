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
        res.render("user", { user: req.user.email})
        
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