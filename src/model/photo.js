if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function store_location(account, lat, lng) {

    const sql = `
        UPDATE Users
        SET store_lat = $2 , store_lng = $3
        WHERE username = $1
        RETURNING *
    `;

    return db.one(sql, [account, lat, lng]);
}

function list_photos(account) {

    const sql = `
        SELECT *
        FROM Photos
        where username = $1
    `;

    return db.any(sql, [account]);
}

function store_photo_url(account,url) {
    
    const sql = `
        INSERT INTO Users ($<this:name>)
        VALUES ($<account>, $<url>)
        RETURNING *
    `;

    return db.one(sql, {account, url});
}

function get_store_photo_url(account) {
    
    const sql = `
        SELECT *
        FROM Users
        where username = $1
    `;

    return db.one(sql, {account});
}

module.exports = {
    store_location,
    list_photos,
    store_photo_url,
    get_store_photo_url
};