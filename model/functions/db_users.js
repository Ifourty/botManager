const db = require('../classes/DataBase');


async function get_user_by_id(id) {
    return await db.query('SELECT * FROM user WHERE id = ?', [id]);
}

async function try_login(username, password) {
    var data = await db.query('SELECT * FROM user WHERE NAME = ? AND PASSWORD = ?', [username, password]);
    if(data.length == 0){
        console.log('no user found');
        return false;
    } else {
        var current = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:/g, ':');
        var id = data[0].ID;
        await db.query('UPDATE user SET LAST_CONNEXION_DATE = ? WHERE ID = ?', [current, id]);
        return data;
    }

}

async function get_all_users() {
    return await db.query('SELECT * FROM user');
}

async function create_empty_user(){
    var current = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/:/g, ':');
    await db.query('INSERT INTO user (NAME, PASSWORD, LEVEL, CREATE_DATE) VALUES ("", "", "", ?)', [current]);
    return await db.query('SELECT * FROM user ORDER BY ID DESC LIMIT 1');
}

async function delete_user(ID){
    return await db.query('DELETE FROM user WHERE ID = ?', [ID]);
}

async function update_user(ID,NAME,PASSWORD,LEVEL){
    return await db.query('UPDATE user SET NAME = ?, PASSWORD = ?, LEVEL = ? WHERE ID = ?', [NAME,PASSWORD,LEVEL,ID]);
}



module.exports = {
    get_user_by_id,
    try_login,
    get_all_users,
    create_empty_user,
    delete_user,
    update_user
};



