const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }
    res.render('pages/index.html.twig');
});

module.exports = router;
