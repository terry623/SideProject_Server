if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function store_current_position(account, lat, lng) {

    const sql = `
            UPDATE Users
            SET current_lat = $2 , current_lng = $3
            WHERE username = $1
            RETURNING *
        `;

    return db.one(sql, [account, lat, lng]);
}

function store_last_position(account, lat, lng) {

    const sql = `
        UPDATE Users
        SET store_lat = $2 , store_lng = $3
        WHERE username = $1
        RETURNING *
    `;

    return db.one(sql, [account, lat, lng]);
}

function store_photo_url(account, photo_url) {

    const sql = `
        INSERT INTO Photos ($<this:name>)
        VALUES ($<account>, $<photo_url>)
        RETURNING *
    `;

    return db.one(sql, {
        account,
        url
    });
}

function get_user_infor(account) {

    const sql = `
        SELECT *
        FROM Users
        where username = $1
    `;

    return db.any(sql, [account]);
}

function get_photo_infor(account) {

    const sql = `
        SELECT *
        FROM Photos
        where username = $1
    `;

    return db.any(sql, [account]);
}

module.exports = {
    store_current_position,
    store_last_position,
    store_photo_url,
    get_user_infor,
    get_photo_infor
};