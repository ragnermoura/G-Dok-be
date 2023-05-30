const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../db/conn')

const Documento = conn.define('tb_documento', {
    id_documento: {
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vencimento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  observacao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pdf: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
},{ freezeTableName: true });

module.exports = Documento;