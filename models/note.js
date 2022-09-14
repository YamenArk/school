const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Note = sequelize.define('note', {
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



module.exports = Note;