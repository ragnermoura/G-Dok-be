const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../db/conn");

const nivel = require("./nivel");
const status = require("./status");
const perfil = require("./perfil");

const Usuario = conn.define(
  "tb001_usuarios",
  {
    id_user: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sobrenome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    id_nivel: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    id_status: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);



Usuario.belongsTo(nivel, {
  foreignKey: "id_nivel",
  constraints: true,
  foreignKeyConstraint: "id_nivel",
});

Usuario.belongsTo(status, {
  foreignKey: "id_status",
  constraints: true,
  foreignKeyConstraint: "id_status",
});

Usuario.belongsTo(perfil, {
  foreignKey: "id_perfil",
  constraints: true,
  foreignKeyConstraint: "id_perfil",
});


module.exports = Usuario;
