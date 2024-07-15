const express = require('express');
const router = express.Router();

const { get_games } = require('../model/functions/db_games');
const { getServerThatContainGameId } = require('../model/functions/db_channel');
router.get('/', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var data = {
            user : req.session.user,
            nav : 'LeakNews',
            active : 'post',
            games : await get_games(),
        }
        res.render('pages/leaksNewsPost.html.twig', data);
    }
});
module.exports = router;

router.get('/getservers', async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        var gameId = req.query.id;
        var servers = await getServerThatContainGameId(gameId);
        res.send(servers);
    }
});
