const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const PublicNote = sequelize.define('publicNote', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title : {
        type: Sequelize.STRING,
        require : true,        
      },
      message: {
        type: Sequelize.STRING,
        require : true,
        allowNull: false,
      },
    exp_date: {
        type: Sequelize.DATEONLY
    },
    start_date: {
      type: Sequelize.DATEONLY
  }

});



module.exports = PublicNote;