const express = require('express');
const getDb = require('../database/bootstrap.database');

const productsRouter = express.Router();

productsRouter.get('/:id', (req, res) => {
    const db = getDb();
    const id = req.params.id;
    db.get_product( [id] )
        .then(response => res.status(200).send(response))
        .catch(err => console.log(err))
});

productsRouter.post('/create', (req, res) => {
    const id = req.params.id;
    const db = getDb();
    const { name, description, price } = req.body;
    db.create_product([name, description, price])
        .then( () => res.status(200).send())
        .catch( err => res.send(err))
});

productsRouter.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, price } = req.body;
    const db = getDb();
    db.update_product([id, name, description, price])
        .then( promise => res.status(200).send(promise))
        .catch( err => res.send(err))
});

productsRouter.delete('/delete/:id', (req, res) => {
    const db = getDb();
    db.delete_product(req.params.id)
        .then( () => res.status(200).send())
        .catch( err => res.send(err))
});

module.exports = productsRouter;