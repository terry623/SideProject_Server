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

module.exports = {
    store_location
};