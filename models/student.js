const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Student = sequelize.define('student', {

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
    age: Sequelize.INTEGER,
    father_name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        },
    password :{
        type : Sequelize.STRING,
        allowNull: false,
        },
    signInDate :{
        type : Sequelize.DATEONLY,
        allowNull: false,
        },
    BirthDate :{
        type : Sequelize.DATEONLY,
        allowNull: false,
        },
    attend_number :{
        type : Sequelize.INTEGER,
        },
    absence_number :{
        type : Sequelize.INTEGER
        },    
        rank : {
          type:Sequelize.INTEGER
        },
        tokenMessage : {
          type : Sequelize.STRING
        }        
});



module.exports = Student;