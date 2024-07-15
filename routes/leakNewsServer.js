const express = require('express');
const { get_servers, update_server, create_empty_server, delete_server } = require('../model/functions/db_servers');
const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var edit = null;

        if(req.query.edit){
            edit = req.query.edit;
        }

        if(req.query.delete){
            await delete_server(req.query.delete);
        }

        var data = {
            user : req.session.user,
            nav : 'LeakNews',
            active : 'server',
            servers : await get_servers(),
            editID : edit

        }
        res.render('pages/leaksNewsServer.html.twig', data);
    }
});

router.post('/edit', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        if(req.body.NAME != "" && req.body.ID_DISCORD != ""){
            await update_server(req.body.ID, req.body.NAME, req.body.ID_DISCORD);
        } else{
            await delete_server(req.body.ID);
        }
        res.redirect('/leaknewsserver');
    }
});

router.get('/new', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var id = await create_empty_server();
        id = id[0].ID;
        
        res.redirect('/leaknewsserver?edit='+ id);
    }
});
module.exports = router;
