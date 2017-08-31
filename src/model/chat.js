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

function search_friends(account) {

    const sql = `
        SELECT a.username, a.current_lat, a.current_lng
        FROM Users a, Distance b
        where ( b.client_1 = $1 and a.username = b.client_2 ) 
        or ( b.client_2 = $1 and a.username = b.client_1 )
    `;

    return db.any(sql, [account]);
}

function add_friends(client_1, client_2) {

    const sql = `
        INSERT INTO Distance ($<this:name>)
        VALUES ($<client_1>, $<client_2>)
        RETURNING *
    `;

    return db.one(sql, {
        client_1,
        client_2
    });
}

function update_distance(client_1, client_2, distance) {

    const sql = `
        UPDATE Distance
        SET distance = $3
        where ( client_1 = $1 and client_2 = $2 ) or ( client_1 = $2 and client_2 = $1 )
        RETURNING *
    `;

    return db.one(sql, [client_1, client_2, distance]);
}

function find_friends_around_you(account) {

    const sql = `
        SELECT b.client_1, b.client_2, b.id
        FROM Users a, Distance b
        where
        ( b.client_1 = $1 and a.username = b.client_2 and b.distance < 1 and a.socket_id is not null )
        or
        ( b.client_2 = $1 and a.username = b.client_1 and b.distance < 1 and a.socket_id is not null )
    `;

    return db.any(sql, [account]);
}

function remove_socket_id(socket_id) {

    const sql = `
        UPDATE Users
        SET socket_id = null
        where socket_id = $1
        RETURNING *
    `;

    return db.any(sql, [socket_id]);
}

module.exports = {
    store_socket_id,
    get_target_socket_id,
    search_friends,
    add_friends,
    update_distance,
    find_friends_around_you,
    remove_socket_id
};