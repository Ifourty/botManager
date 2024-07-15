const express = require('express');
const router = express.Router();
const { get_all_discord_users, create_empty_discord_user, delete_discord_user, update_discord_user } = require('../model/functions/db_discord_users');

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
            await delete_discord_user(req.query.delete);
        }
        var data = {
            user : req.session.user,
            active : 'discord_users',
            users : await get_all_discord_users(),
            editID : edit
        }
        res.render('pages/managediscordusers.html.twig', data);
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
        if(req.body.NAME != "" && req.body.ID_DISCORD != ""){
            await update_discord_user(req.body.ID,req.body.NAME, req.body.ID_DISCORD);
        } else{
            await delete_discord_user(req.body.ID);
        }

        res.redirect('/managediscordusers');
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
        var id = await create_empty_discord_user();
        id = id[0].ID;
        res.redirect('/managediscordusers?edit='+ id);
    }
});

module.exports = router;