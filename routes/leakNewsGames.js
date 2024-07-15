const express = require('express');
const router = express.Router();
const { get_games, create_empty_game, delete_game, update_game } = require('../model/functions/db_games');

router.get('/', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var edit = null;
        if(req.query.edit){
            edit = req.query.edit;
        }

        if(req.query.delete){
            await delete_game(req.query.delete);
        }

        var data = {
            user : req.session.user,
            nav : 'LeakNews',
            active : 'games',
            games : await get_games(),
            editID : edit
        }
        res.render('pages/leaksNewsGames.html.twig', data);
    }
});

router.post('/edit', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        if(req.body.NAME != ""){
            await update_game(req.body.ID, req.body.NAME);
        } else{
            await delete_game(req.body.ID);
        }
        res.redirect('/leaknewsgames');
    }
});

router.get('/new', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var id = await create_empty_game();
        id = id[0].ID;

        res.redirect('/leaknewsgames?edit='+ id);
    }
});

module.exports = router;
