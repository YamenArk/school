const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const program = sequelize.define('program', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true
      
      },
      day:{
        type:Sequelize.STRING,
        allowNull:false
      },
      first:{
        type:Sequelize.STRING,
        allowNull:false
      },
      second:{
        type:Sequelize.STRING,
        allowNull:false
      },
      third:{
        type:Sequelize.STRING,
        allowNull:false
      },
      forth:{
        type:Sequelize.STRING,
        allowNull:false
      },
      fifth:{
        type:Sequelize.STRING,
        allowNull:false
      },
      sixth:{
        type:Sequelize.STRING,
        allowNull:false
      },
      seventh:{
        type:Sequelize.STRING
      }  
});



module.exports = program;