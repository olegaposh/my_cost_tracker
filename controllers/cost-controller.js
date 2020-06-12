const express = require("express");
const router = express.Router();
const db = require("../models");

//This router will pull up User specific data based on the query.
router.get("/api/user/transaction", async (req, res) => {
    try{
        let query = {}
        query.email = req.body.userEmail;
        
        const data = await db.transaction.findAll({
            where: query
        }).then(
            (result) => {
                console.log(result);

                res.json(result);
            }
        );

        // res.json(data);
    }catch(error) {
        console.log(error);

        res.status(500).send(error);
    }
});

// router.get("/api/ ", async (req, res) => {
//     try{
//         const data = await db. .findAll();

//         res.json(data);
//     }catch(error) {
//         console.log(error);

//         res.status(500).send(error);
//     }
// });


//This will allow the user to add receipts to their file.
router.post("/api/user/add", async (req, res) => {
    try{
        const data = await db.transaction.create(req.body);

        res.json(data);

    }catch(error) {
        console.log(error);

        res.status(500).send(error);
    }
});


//Paid or not paid?
router.put("/api/user/paid/:id", async (req, res) => {
    try{
        const data = await db.transaction.update({
            paid: true,
            where: {
                id: req.params.id
            }
        });

        res.json(data);

    }catch(error) {
        console.log(error);

        res.status(500).send(error);
    }
});


//Allows user to edit typos.
router.put("/api/user/transaction/:id", async (req, res) => {
    try{
        const data = await db.Transaction.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.json(data);

    }catch(error) {
        console.log(error);

        res.status(500).send(error);
    }
});


//Delete function.
router.delete("/api/user/transaction/:id", async (req, res) => {
    try{
        const data = await db.Transaction.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(data);

    }catch(error) {
        console.log(error);

        res.status(500).send(error);
    }
});

module.exports = router;