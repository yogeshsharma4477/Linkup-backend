require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.URI
});
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;
