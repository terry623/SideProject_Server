require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Drop (droppable only when no dependency)
    DROP TABLE IF EXISTS Users;

    -- Create
    CREATE TABLE Users (
        id              serial PRIMARY KEY NOT NULL,
        "email"         varchar(50),
        "username"      varchar(50),
        "password"      varchar(50)
    );
`;

db.none(schemaSql).then(() => {
    console.log('Schema Create!');
    pgp.end();
}).catch(err => {
    console.log('Error Creating Schema!', err);
});
