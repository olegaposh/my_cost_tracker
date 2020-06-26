const passport = require("passport")
const express = require("express")
const router = express.Router()
const db = require("../models")

//passport
router.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
require("../config/passport")(passport)
router.use(passport.initialize())
router.use(passport.session())

// fetch the user's transactions onto the home page
router.get("/", (req, res) => {

  if (req.user) {
      try {

          let query = {}
          query.userId = req.user.id;

          db.transaction.findAll({
              where: query,
              include: [db.user]

          }).then((result) => {
            
            let total = 0;
            for (i= 0; i < result.length; i++) {

                total = total + result[i].dataValues.amount
              }

              res.render("user", {
                  id: req.user.id,
                  user: req.user.email,
                  userTransactions: result,
                  total: total
              })
            //   console.log(result[1].dataValues)

              
              


          });

          // res.json(data);
      } catch (error) {
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