if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function show_all_users() {
    const sql = `
        SELECT *
        FROM Users
    `;
    return db.any(sql);
}

function show_all_photos() {
    const sql = `
        SELECT *
        FROM Photos
    `;
    return db.any(sql);
}

function show_all_distance() {
    const sql = `
        SELECT *
        FROM Distance
    `;
    return db.any(sql);
}

module.exports = {
    show_all_users,
    show_all_photos,
    show_all_distance
};
