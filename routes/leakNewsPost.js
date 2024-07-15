const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var data = {
            user : req.session.user,
            nav : 'LeakNews',
            active : 'post'
        }
        res.render('pages/leaksNewsPost.html.twig', data);
    }
});
module.exports = router;
