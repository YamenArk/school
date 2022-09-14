const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Abscese = sequelize.define('abscese', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      message: {
        type: Sequelize.STRING,
        require : true,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY
    }
});



module.exports = Abscese;