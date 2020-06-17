const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("passport")

// router.get("/", (req, res) => {

//     if (req.user) {
//         try {

//             let query = {}
//             query.user_id = req.user.id;

//             db.transaction.findAll({
//                 where: query,
//                 include: [db.user]

//             }).then((result) => {

//                 res.render("user", {
//                     user: req.user.email,
//                     userTransactions: result
//                 })
//             }
//             );

//             // res.json(data);
//         } catch (error) {
//             console.log(error);

//             res.status(500).send(error);
//         }

//     } else {
//         res.redirect("/login");
//     }
// })


router.get("/addTransaction", (req, res) => {

    const userid = req.query.userid

    res.render("addTran", {id: userid});
});




//This router will pull up User specific data based on the query.
router.get("/api/user/transaction", async (req, res) => {
    try {
        let query = {}
        query.email = req.body.userEmail;

        const data = await db.transaction.findAll({
            where: query,
        }).then(
            (result) => {
                console.log(result);

                res.json(result);
            }
        );

        // res.json(data);
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});



//ADD TRASACTIONS
router.post("/api/transactions", async (req, res) => {
    console.log("hello")
    try {
    
        console.log(req.body);
        
        
         const data = await db.transaction.create(req.body);

        res.json(data);
        

    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
    
});


//Paid or not paid?
router.put("/api/user/paid/:id", async (req, res) => {
    try {
        const data = await db.transaction.update({
            paid: true,
            where: {
                id: req.params.id
            }
        });

        res.json(data);

    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});


//Allows user to edit typos.
router.put("/api/user/transaction/:id", async (req, res) => {
    try {
        const data = await db.transaction.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.json(data);

    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});


//Delete function.
router.delete("/api/user/transaction/:id", async (req, res) => {
    try {
        const data = await db.Transaction.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(data);

    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});

module.exports = router;