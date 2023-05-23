require("dotenv").config();
const express = require("express");
const router = express.Router();
require("dotenv").config();
const Cnae = require("../models/tb_cnae");

router.get("/", async (req, res, next) => {
  try {
    const cnae = await Cnae.findAll();
    return res.status(200).send({ response:cnae });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/:id_cnae", async (req, res, next) => {
  try {
    const cnae = await Cnae.findByPk(req.params.id_cnae);
    if (!cnae) {
      return res.status(404).send({ mensagem: "cnae não encontrado." });
    }
    return res.status(200).send({ response: cnae });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const cnae = await Cnae.findByPk(req.body.id_cnae);
    if (!cnae) {
      return res.status(404).send({ mensagem: "Cnae não encontrado." });
    }
    await cnae.destroy();
    return res.status(202).send({ mensagem: "Cnae excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/cadastro", async (req, res, next) => {
  try {
    const novo = await Cnae.create({
      cnae: req.body.cnae,
    });

    const response = {
      dados: {
        mensagem: "Cnae Cadastrado com sucesso",
        cnaeCriado: {
          id_cnae: novo.id_cnae,
          cnae: novo.cnae,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um cnae",
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
