const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Mark = sequelize.define('mark', {
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


module.exports = Mark;