require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    DROP TABLE IF EXISTS Users;
    DROP TABLE IF EXISTS Photos;

    CREATE TABLE Users (
        id              serial PRIMARY KEY NOT NULL,
        "username"      varchar(50) NOT NULL,
        "password"      varchar(50) NOT NULL,
        "start_time"   timestamp without time zone default (now() at time zone 'utc+8'),
        "current_lat"   float NOT NULL DEFAULT 0,
        "current_lng"   float NOT NULL DEFAULT 0,
        "current_heading"   float NOT NULL DEFAULT 0,
        "current_pitch"   float NOT NULL DEFAULT 0
    );

    CREATE TABLE Photos (
        id              serial PRIMARY KEY NOT NULL,
        "account"       varchar(50) NOT NULL,
        "photo_url"     varchar(300) NOT NULL
    );
`;

db.none(schemaSql).then(() => {
    console.log('Schema Create!');
    pgp.end();
}).catch(err => {
    console.log('Error Creating Schema!', err);
});