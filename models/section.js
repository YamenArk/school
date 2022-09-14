const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Section = sequelize.define('section', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    name_sec: {
        type: Sequelize.STRING,
        allowNull: false,
      },   
   
    });



module.exports = Section;