if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function create(email, username, password) {
    const sql = `
        INSERT INTO Users ($<this:name>)
        VALUES ($<email>, $<username>, $<password>)
        RETURNING *
    `;
    return db.one(sql, {email, username, password});
}

module.exports = {
    create
};
