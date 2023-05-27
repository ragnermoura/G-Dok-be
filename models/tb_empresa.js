const { Sequelize, DataTypes } = require('sequelize');
const conn = require('../db/conn')

const Empresa = conn.define('tb_empresa', {
    id_empresa: {
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  razao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  responsavel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
},{ freezeTableName: true });

module.exports = Empresa;