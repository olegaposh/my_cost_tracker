const passport = require("password")
const express = require("express")
const router = express.Router()
const db = require("../models")

//passport
require("../config/passport")(passport)
router.use(passport.initialize())
// optional? 
router.use(passport.session())

router.get("/", (req, res) => {

    if (req.user) {
        res.render("user", { user: req.user})
    } else {
        res.redirect("/login");
    }
})

router.post("/login", passport.authenticate("local-login", {

    failureRedirect: "/login",
    successRedirect: "/"
}))

router.post("/signup", passport.authenticate("local-signup", {

    failureRedirect: "/signup",
    successRedirect: "/"
}))

router.get("/logout", (req, res) => {

    req.logout();
    res.redirect("/");
})

module.exports = router;