require("dotenv").config();
const express = require("express");
const router = express.Router();
require("dotenv").config();
const Nivel = require("../models/tb_nivel");

router.get("/", async (req, res, next) => {
  try {
    const nivel = await Nivel.findAll();
    return res.status(200).send({ response:nivel });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/:id_nivel", async (req, res, next) => {
  try {
    const nivel = await Nivel.findByPk(req.params.id_nivel);
    if (!nivel) {
      return res.status(404).send({ mensagem: "Nível não encontrado." });
    }
    return res.status(200).send({ response: nivel });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const nivel = await Nivel.findByPk(req.body.id_nivel);
    if (!nivel) {
      return res.status(404).send({ mensagem: "Nível não encontrado." });
    }
    await nivel.destroy();
    return res.status(202).send({ mensagem: "Nível excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/cadastro", async (req, res, next) => {
  try {
    const novo = await Nivel.create({
      nivel: req.body.nivel,
    });

    const response = {
      dados: {
        mensagem: "Nível Cadastrado com sucesso",
        nivelCriado: {
          id_nivel: novo.id_nivel,
          nivel: novo.nivel,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um nivel",
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
