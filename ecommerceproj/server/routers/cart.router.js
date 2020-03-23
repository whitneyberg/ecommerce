const express = require('express');
const getDb = require('../database/bootstrap.database');

const cartRouter = express.Router();

cartRouter.get('/:userid', (req, res) => {
    const db = getDb();
    const userid = req.params.userid;
    console.log(userid);
    db.get_cart_items([ userid ])
        .then(response => res.status(200).send(response))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
});

cartRouter.post('/post', (req, res) => {
    const db = getDb();
    const { user_id, product_id, quantity } = req.body;
    db.create_cart_item([ user_id, product_id, quantity ])
        .then(response => res.status(200).send(response))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
});

cartRouter.delete('/delete/:userid', (req, res) => {
    const db = getDb();
    const userid = req.params.userid;
    db.delete_cart_item([ userid ])
        .then(response => res.status(200).send(response))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
});

module.exports = cartRouter;