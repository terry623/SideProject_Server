if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function store_socket_id(account, socket_id) {

    const sql = `
        UPDATE Users
        SET socket_id = $2
        where username = $1
        RETURNING *
    `;

    return db.one(sql, [account, socket_id]);
}

function get_target_socket_id(account) {

    const sql = `
        SELECT *
        FROM Users
        where username = $1
    `;

    return db.one(sql, [account]);
}

module.exports = {
    store_socket_id,
    get_target_socket_id
};