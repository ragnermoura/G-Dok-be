require("dotenv").config();
const express = require("express");
const router = express.Router();
require("dotenv").config();
const Tipo = require("../models/tb_tipo");

router.get("/", async (req, res, next) => {
  try {
    const tipo = await Tipo.findAll();
    return res.status(200).send({ response:tipo });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/:id_tipo", async (req, res, next) => {
  try {
    const tipo = await Tipo.findByPk(req.params.id_tipo);
    if (!tipo) {
      return res.status(404).send({ mensagem: "Tipo não encontrado." });
    }
    return res.status(200).send({ response: tipo });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const tipo = await Tipo.findByPk(req.body.id_tipo);
    if (!tipo) {
      return res.status(404).send({ mensagem: "Tipo não encontrado." });
    }
    await tipo.destroy();
    return res.status(202).send({ mensagem: "Tipo excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/cadastro", async (req, res, next) => {
  try {
    const novo = await Tipo.create({
      tipo: req.body.tipo,
    });

    const response = {
      dados: {
        mensagem: "Tipo Cadastrado com sucesso",
        tipoCriado: {
          id_tipo: novo.id_tipo,
          cnae: novo.tipo,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um tipo",
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
