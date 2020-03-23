const express = require('express');
const getDb = require('../database/bootstrap.database');

const usersRouter = express.Router();

usersRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const db = getDb();
    db.get_user( [id] )
        .then( user => res.status(200).send(user))
        .catch( err => res.status(500).send(err))
});

//get user from email
usersRouter.get('/', (req, res) => {
    const db = getDb();
    const {email} = req.body;
    db.get_user_email( [email] )
        .then( user => res.status(200).send(user))
        .catch( err => res.status(500).send(err))
});

usersRouter.post('/register', (req, res) => {
    const db = getDb();
    const { first_name, last_name, company, address, city, state, zip_code, phone, email } = req.body;
    db.create_user([first_name, last_name, company, address, city, state, zip_code, phone, email])
        .then( () => res.status(200).send())
        .catch( err => res.send(err))
});

usersRouter.put('/update/:id', (req, res) => {
    const db = getDb();
    const id = req.params.id;
    const { first_name, last_name, company, address, city, state, zip_code, phone, email } = req.body;
    db.update_user([id, first_name, last_name, company, address, city, state, zip_code, phone, email])
        .then( promise => res.status(200).send(promise))
        .catch( err => res.send(err) )
});

usersRouter.delete('/delete/:id', (req, res) => {
    const db = getDb();
    db.delete_user(req.params.id)
        .then( () => res.status(200).send() )
        .catch( err => res.send(err) )
});

module.exports = usersRouter;