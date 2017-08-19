if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function create(email, account, password) {
    const sql = `
        INSERT INTO posts ($<this:name>)
        VALUES ($<email>, $<account>, $<password>)
        RETURNING *
    `;
    return db.one(sql, {email, account, password});
}

module.exports = {
    create
};
