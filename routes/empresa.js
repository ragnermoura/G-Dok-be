require("dotenv").config();
const express = require("express");
const router = express.Router();
require("dotenv").config();
const Empresa = require("../models/tb_empresa");

router.get("/", async (req, res, next) => {
  try {
    const empresa = await Empresa.findAll();
    return res.status(200).send({ response:empresa });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/:id_empresa", async (req, res, next) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id_empresa);
    if (!empresa) {
      return res.status(404).send({ mensagem: "Empresa não encontrada." });
    }
    return res.status(200).send({ response: empresa });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const empresa = await Ano.findByPk(req.body.id_empresa);
    if (!empresa) {
      return res.status(404).send({ mensagem: "Empresa não encontrada." });
    }
    await empresa.destroy();
    return res.status(202).send({ mensagem: "Empresa excluída com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/cadastro", async (req, res, next) => {
  try {
    const novo = await Empresa.create({
      razao: req.body.razao,
      cnpj: req.body.cnpj,
      endereco: req.body.endereco,
      telefone1: req.body.telefone1,
      telefone2: req.body.telefone2,
      responsavel: req.body.responsavel,
      email: req.body.email,
      cpf: req.body.cpf,
    });

    const response = {
      dados: {
        mensagem: "Empresa Cadastrada com sucesso",
        empresaCriado: {
          id_empresa: novo.id_empresa,
          empresa: novo.empresa,
          request: {
            tipo: "GET",
            descricao: "Pesquisa uma empresa",
          },
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
