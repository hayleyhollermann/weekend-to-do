const pg = require('pg');

// configure
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

// connect
pool.on("connect", () => {
    console.log('connected to postgres');
});

// error
pool.on("error", (err) => {
    console.log('error connecting to postgres', err);
});

// exports
module.exports = pool;