const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../db/conn')

const Tipo = conn.define('tb_tipo', {
    id_tipo: {
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
},{ freezeTableName: true });

module.exports = Tipo;