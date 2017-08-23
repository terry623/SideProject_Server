if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function check_username(username) {
    const where = username ? `WHERE username = '$1:value'` : '';
    const sql = `
        SELECT *
        FROM Users
        ${where}
    `;
    return db.any(sql, [username]);
}

function create_account(username, password) {
    const sql = `
        INSERT INTO Users ($<this:name>)
        VALUES ($<username>, $<password>)
        RETURNING *
    `;
    return db.one(sql, {
        username,
        password
    });
}

module.exports = {
    create_account,
    check_username
};