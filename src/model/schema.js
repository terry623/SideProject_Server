require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Drop (droppable only when no dependency)
    DROP TABLE IF EXISTS posts;
    DROP TYPE IF EXISTS mood;

    -- Create
    CREATE TYPE mood AS ENUM (
        'Clear',
        'Clouds',
        'Drizzle',
        'Rain',
        'Thunder',
        'Snow',
        'Windy'
    );
    CREATE TABLE posts (
        id              serial PRIMARY KEY NOT NULL,
        mood            mood,
        text            text NOT NULL,
        ts              bigint NOT NULL DEFAULT (extract(epoch from now())),
        "clearVotes"    integer NOT NULL DEFAULT 0,
        "cloudsVotes"   integer NOT NULL DEFAULT 0,
        "drizzleVotes"  integer NOT NULL DEFAULT 0,
        "rainVotes"     integer NOT NULL DEFAULT 0,
        "thunderVotes"  integer NOT NULL DEFAULT 0,
        "snowVotes"     integer NOT NULL DEFAULT 0,
        "windyVotes"    integer NOT NULL DEFAULT 0
    );
`;

const dataSql = `
    -- Populate dummy posts
    INSERT INTO posts (mood, text, ts)
    SELECT
        'Clear',
        'word' || i || ' word' || (i+1) || ' word' || (i+2),
        round(extract(epoch from now()) + (i - 20) * 3600)
    FROM generate_series(1, 20) AS s(i);
`;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
        console.log('Data populated');
        pgp.end();
    });
}).catch(err => {
    console.log('Error creating schema', err);
});
