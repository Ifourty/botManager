const express = require('express');
const path = require('path');

const session = require('express-session');
require('dotenv').config();

const app = express();
const port = 8080;

// Middleware pour traiter les données POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
    secret: "azeaz",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));



// Configuration du moteur de rendu
app.engine('twig', require('twig').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Configuration des fichiers statiques
app.use(express.static('public'));

// Bd

const db = require('./model/classes/DataBase');
db.connect();

// Routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const leaknewsPostRouter = require('./routes/leakNewsPost');
const leaknewsGamesRouter = require('./routes/leakNewsGames');
const leaknewsServerRouter = require('./routes/leakNewsServer');
const leaksNewsChannelRouter = require('./routes/leakNewsChannel');
const managewebsiteuserRouter = require('./routes/managewebsiteuser');
const managediscordusersRouter = require('./routes/managediscordeuser');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/leaknewspost', leaknewsPostRouter);
app.use('/leaknewsgames', leaknewsGamesRouter);
app.use('/leaknewsserver', leaknewsServerRouter);
app.use('/leaknewschannel', leaksNewsChannelRouter);
app.use('/managewebsiteuser', managewebsiteuserRouter);
app.use('/managediscordusers', managediscordusersRouter);

// Lancement du serveur
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

