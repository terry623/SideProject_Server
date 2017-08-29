require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    DROP TABLE IF EXISTS Users;
    DROP TABLE IF EXISTS Photos;
    DROP TABLE IF EXISTS Distance;

    CREATE TABLE Users (
        id              serial PRIMARY KEY NOT NULL,
        "username"      varchar(50) NOT NULL,
        "password"      varchar(50) NOT NULL,
        "socket_id"     varchar(50),
        "travel_time"   int NOT NULL DEFAULT 0,
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

    CREATE TABLE Distance (
        id              serial PRIMARY KEY NOT NULL,
        "client_1"       varchar(50) NOT NULL,
        "client_2"       varchar(50) NOT NULL,
        "distance"       int NOT NULL DEFAULT 0
    );
`;

db.none(schemaSql).then(() => {
    console.log('Schema Create!');
    pgp.end();
}).catch(err => {
    console.log('Error Creating Schema!', err);
});