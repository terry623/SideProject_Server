if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function verify(account, password) {

    const where = account ? `WHERE text ILIKE '$1:value'` : '';
    const sql = `
        SELECT *
        FROM sideproject
        ${where}
    `;
    return db.any(sql, account);
}

module.exports = {
    verify
};
