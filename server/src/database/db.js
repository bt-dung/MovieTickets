const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');


dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: "+07:00",
});
sequelize.sync()
    .then(() => {
        console.log('Database synced!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
const connectDB = async () => {
    try {
        await sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        console.error('Error details:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };