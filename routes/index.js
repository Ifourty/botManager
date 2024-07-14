const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        res.render('pages/index.html.twig',{user: req.session.user});
    }
});

module.exports = router;
