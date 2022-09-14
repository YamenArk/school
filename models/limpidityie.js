const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Limpidityie = sequelize.define('limpidityie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    limpidityies: {
        type: Sequelize.STRING,
        allowNull: false,
        require : true
      }
});



module.exports = Limpidityie;