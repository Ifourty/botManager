const express = require('express');
const router = express.Router();
const { get_all_users, create_empty_user, delete_user, update_user } = require('../model/functions/db_users');

router.get('/', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');

    }
    else if(req.session.user.level < 100){
        res.redirect('/');
    }
    else{
        var edit = null;
        if(req.query.edit){
            edit = req.query.edit;
        }

        if(req.query.delete){
  
        }
        var data = {
            user : req.session.user,
            active : 'website_users',
            users : await get_all_users(),
            editID : edit
        }
        res.render('pages/managewebsiteusers.html.twig', data);
    }
});

router.post('/edit', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }
    else if(req.session.user.level < 100){
        res.redirect('/');
    }
    else{
        if(req.body.NAME != "" && req.body.PASSWORD != "" && req.body.LEVEL != ""){
            await update_user(req.body.ID,req.body.NAME, req.body.PASSWORD, req.body.LEVEL);
        } else{
            await delete_user(req.body.ID);
        }

        res.redirect('/managewebsiteuser');
    }
});

router.get('/new', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    }
    else if(req.session.user.level < 100){
        res.redirect('/');
    }
    else{
        var id = await create_empty_user();
        id = id[0].ID;
        res.redirect('/managewebsiteuser?edit='+ id);
    }
});

module.exports = router;