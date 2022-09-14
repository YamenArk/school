const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Instructor = sequelize.define('instructor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    first_name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
    last_name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },      
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique : true
        },
    password :{
        type : Sequelize.STRING,
        allowNull: false
        },
    role:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tokenMessage:{
      type : Sequelize.STRING
    },
    classeNameClass:{
      type: Sequelize.INTEGER,
      unique : true
    }
});



module.exports = Instructor;