const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const NotesIteam = sequelize.define('notesiteam', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
module.exports = NotesIteam;
