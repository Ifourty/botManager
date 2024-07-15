const db = require('../classes/DataBase');


async function get_all_discord_users() {
    return await db.query('SELECT * FROM discord_user');
}

async function create_empty_discord_user(){
    await db.query('INSERT INTO discord_user (NAME,ID_DISCORD) VALUES ("", "")');
    return await db.query('SELECT * FROM discord_user ORDER BY ID DESC LIMIT 1');
}

async function delete_discord_user(ID){
    return await db.query('DELETE FROM discord_user WHERE ID = ?', [ID]);
}

async function update_discord_user(ID,NAME,ID_DISCORD){
    return await db.query('UPDATE discord_user SET NAME = ?, ID_DISCORD = ? WHERE ID = ?', [NAME,ID_DISCORD,ID]);
}



module.exports = {
    get_all_discord_users,
    create_empty_discord_user,
    delete_discord_user,
    update_discord_user
};



