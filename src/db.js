const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'november2001',
    host: 'localhost',
    port: 5432,
    database: 'bingle_shop'
});

client.connect();

module.exports = client;