require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    DROP TABLE IF EXISTS Users;

    CREATE TABLE Users (
        id              serial PRIMARY KEY NOT NULL,
        "username"      varchar(50) NOT NULL,
        "password"      varchar(50) NOT NULL,
        "store_lat"     float NOT NULL DEFAULT 0,
        "store_lng"     float NOT NULL DEFAULT 0
    );

    CREATE TABLE Photos (
        id              serial PRIMARY KEY NOT NULL,
        "account"      varchar(50) NOT NULL,
        "url"           varchar(100) NOT NULL
    );
`;

db.none(schemaSql).then(() => {
    console.log('Schema Create!');
    pgp.end();
}).catch(err => {
    console.log('Error Creating Schema!', err);
});