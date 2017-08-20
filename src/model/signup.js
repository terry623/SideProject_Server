if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function create(username, password) {
    //Insert Distinct
    const sql = `
        INSERT INTO Users ($<this:name>)
        VALUES ($<username>, $<password>)
        RETURNING *
    `;
    return db.one(sql, {username, password});
}

module.exports = {
    create
};
