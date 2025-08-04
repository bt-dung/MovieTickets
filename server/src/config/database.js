require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: '',
    database: process.env.DATABASE_NAME,
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00'
  },
  test: {
    username: 'root',
    password: '',
    database: process.env.DATABASE_NAME,
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00'
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DATABASE_NAME,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    timezone: '+07:00'
  }
};