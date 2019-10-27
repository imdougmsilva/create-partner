const dotenv = require('dotenv');

dotenv.config();

const host = process.env.DB_HOST;
const dbName = process.env.DB_DATABASE;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const dialect = 'postgres';

module.exports = {
  development: {
    username,
    password,
    database: dbName,
    host,
    port,
    dialect,
  },
  qa: {
    username,
    password,
    database: dbName,
    host,
    port,
    dialect,
  },
  prod: {
    username,
    password,
    database: dbName,
    host,
    port,
    dialect,
  },
};
