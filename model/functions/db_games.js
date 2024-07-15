const db = require('../classes/DataBase');

async function get_games() {
    return await db.query('SELECT * FROM games ORDER BY ID ASC');
}

async function create_empty_game(){
    await db.query('INSERT INTO games (NAME) VALUES ("")');
    return await db.query('SELECT * FROM games ORDER BY ID DESC LIMIT 1');
}

async function delete_game(ID){
    return await db.query('DELETE FROM games WHERE ID = ?', [ID]);
}

async function update_game(ID,NAME){
    return await db.query('UPDATE games SET NAME = ? WHERE ID = ?', [NAME,ID]);
}

module.exports = {
    get_games,
    create_empty_game,
    delete_game,
    update_game
};