const db = require('../classes/DataBase');

async function get_servers() {
    return await db.query('SELECT * FROM servers ORDER BY ID ASC');
}

async function update_server(ID,NAME,ID_DISCORD,IMG){
    if(IMG != ''){
        return await db.query('UPDATE servers SET NAME = ?, ID_DISCORD = ?, IMG = ? WHERE ID = ?', [NAME,ID_DISCORD,IMG,ID]);
    } else{
        return await db.query('UPDATE servers SET NAME = ?, ID_DISCORD = ? WHERE ID = ?', [NAME,ID_DISCORD,ID]);
    }
}

async function delete_server(ID){
    return await db.query('DELETE FROM servers WHERE ID = ?', [ID]);
}

async function create_empty_server(){
    await db.query('INSERT INTO servers (NAME, ID_DISCORD) VALUES ("","")');
    return await db.query('SELECT * FROM servers ORDER BY ID DESC LIMIT 1');
}

module.exports = {
    get_servers,
    update_server,
    delete_server,
    create_empty_server
};