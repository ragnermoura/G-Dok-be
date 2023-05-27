const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../db/conn')

const Cnae = conn.define('tb_cnae', {
    id_cnae: {
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cnae: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
},{ freezeTableName: true });

module.exports = Cnae;