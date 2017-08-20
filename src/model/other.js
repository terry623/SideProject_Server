if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function show() {
    const sql = `
        SELECT *
        FROM Users
    `;
    return db.any(sql);
}

module.exports = {
    show
};
