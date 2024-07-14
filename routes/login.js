const express = require('express');
const router = express.Router();

const bd = require('../model/classes/DataBase');
const {try_login} = require('../model/functions/db_users');

router.get('/', (req, res) => {
    if(req.session.user){
        res.redirect('/');
    } else{
        res.render('pages/login.html.twig');
    }
});

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const data = await try_login(username, password);
    if(data != false){
        req.session.user = data[0];
        res.send({
            status: 'success',
            message: 'User logged in'
        });
        //res.redirect('/');
    } else {
        res.send({
            status: 'error',
            message: 'Invalid username or password'
        })
    }
});

module.exports = router;
