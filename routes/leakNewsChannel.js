const express = require('express');
const router = express.Router();
const { get_channels_visual, update_channel, delete_channel, create_empty_channel } = require('../model/functions/db_channel');
const { get_servers } = require('../model/functions/db_servers');
const { get_games } = require('../model/functions/db_games');

router.get('/', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var edit = null;
        var servers = null;
        var games = null;
        if(req.query.edit){
            edit = req.query.edit;
            servers = await get_servers();
            games = await get_games();
        }

        if(req.query.delete){
            await delete_channel(req.query.delete);
        }


        var data = {
            user : req.session.user,
            nav : 'LeakNews',
            active : 'channel',
            channels : await get_channels_visual(),
            editID : edit,
            servers : servers,
            games : games
        }
        res.render('pages/leaksNewsChannel.html.twig', data);
    }
});

router.post('/edit', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        if(req.body.NAME != "" && req.body.ID_SERVER != "" && req.body.ID_GAME != "" && req.body.ID_CHANNEL != ""){
            await update_channel(req.body.ID, req.body.NAME, req.body.ID_SERVER, req.body.ID_CHANNEL, req.body.ID_GAME);
        } else{
            await delete_channel(req.body.ID);
        }
        res.redirect('/leaknewschannel');
    }
});

router.get('/new', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var id = await create_empty_channel();
        id = id[0].ID;

        res.redirect('/leaknewschannel?edit='+ id);
    }
});


module.exports = router;
