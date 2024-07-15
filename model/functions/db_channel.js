const { get } = require('express/lib/response');
const db = require('../classes/DataBase');

async function get_channels() {
    return await db.query('SELECT * FROM channels ORDER BY ID ASC');
}

async function get_channels_visual() {
    return await db.query(`SELECT channels.ID, channels.NAME, servers.NAME AS SERVER, ID_CHANNEL , games.NAME AS GAME
        FROM channels LEFT JOIN servers ON channels.ID_SERVER = servers.ID LEFT JOIN games ON channels.ID_GAME = games.ID
        ORDER BY servers.ID ASC`);
}

async function update_channel(ID, NAME, ID_SERVER, ID_CHANNEL, ID_GAME) {
    return await db.query('UPDATE channels SET NAME = ?, ID_SERVER = ?, ID_CHANNEL = ?, ID_GAME = ? WHERE ID = ?', [NAME, ID_SERVER, ID_CHANNEL, ID_GAME, ID]);
}

async function delete_channel(ID) {
    return await db.query('DELETE FROM channels WHERE ID = ?', [ID]);
}

async function create_empty_channel() {
    await db.query('INSERT INTO channels (NAME, ID_SERVER, ID_CHANNEL, ID_GAME) VALUES ("", "", "", "")');
    return await db.query('SELECT * FROM channels ORDER BY ID DESC LIMIT 1');
}

async function getServerThatContainGameId(gameId) {
    return await db.query('SELECT DISTINCT servers.ID, servers.NAME, servers.IMG FROM servers LEFT JOIN channels ON servers.ID = channels.ID_SERVER WHERE channels.ID_GAME = ? ORDER BY servers.ID ASC', [gameId]);
}

module.exports = {
    get_channels,
    get_channels_visual,
    update_channel,
    delete_channel,
    create_empty_channel,
    getServerThatContainGameId
};