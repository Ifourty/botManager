const express = require('express');
const router = express.Router();

const myBot = require('../model/classes/Bot');

const { get_games } = require('../model/functions/db_games');
const { getServerThatContainGameId, get_channels_by_game_and_server } = require('../model/functions/db_channel');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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

router.post('/create', upload.array('images', 10), async (req, res) => {
    if(!req.session.user){
        res.redirect('/login');
    } else{
        try {
            var id_game = req.body.id_game;
            var id_servers = JSON.parse(req.body.id_servers);
            console.log(id_servers);
            var post = req.body.post;
            var images = req.files;
            
            for (var i = 0; i < id_servers.length; i++) {
                var server = id_servers[i];
    
                console.log(id_game);
                let channel = await get_channels_by_game_and_server(id_game, server);
                console.log(channel);
                if(images.length > 0){
                    if (post == " ") {
                        myBot.sendImages(channel[0].ID_CHANNEL, images);
                    }
                    else {
                        console.log("post = '" + post + "'");
                        myBot.sendMessageWithImages(channel[0].ID_CHANNEL, post, images);
                    }
                } else {
                    myBot.sendMessage(channel[0].ID_CHANNEL, post);
                }
            }
            res.status(200).send('ok');
        } catch (error) {
            console.log(error);
            res.status(500).send('error');
        }
    }
});

    
