if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function verify(username) {
    const where = username ? `WHERE username = '$1:value'` : '';
    const sql = `
        SELECT *
        FROM Users
        ${where}
    `;
    return db.one(sql, username);
}

module.exports = {
    verify
};
