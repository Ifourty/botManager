const db = require('../classes/DataBase');


function get_user_by_id(id) {
    return db.query('SELECT * FROM user WHERE id = ?', [id]);
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



module.exports = {
    get_user_by_id,
    try_login
};



