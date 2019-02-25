import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:05011996vladron@localhost:5432/nodejs');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

exports.sequelize = sequelize;