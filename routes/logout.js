const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.user){
        req.session.destroy();
    } 
    res.send({
        status: 'success',
        message: 'User logged out'
    });
});

module.exports = router;
