require("dotenv").config();
const express = require("express");
const router = express.Router();
require("dotenv").config();
const Documento = require("../models/tb_documento");

router.get("/", async (req, res, next) => {
  try {
    const documento = await Documento.findAll();
    return res.status(200).send({ response:documento });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get("/:id_documento", async (req, res, next) => {
  try {
    const documento = await Documento.findByPk(req.params.id_documento);
    if (!documento) {
      return res.status(404).send({ mensagem: "Documento não encontrado." });
    }
    return res.status(200).send({ response: documento });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const documento = await Documento.findByPk(req.body.id_documento);
    if (!documento) {
      return res.status(404).send({ mensagem: "Documento não encontrado." });
    }
    await documento.destroy();
    return res.status(202).send({ mensagem: "Documento excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/cadastro", async (req, res, next) => {
  try {
    const novo = await Documento.create({
      empresa: req.body.empresa,
      tipo: req.body.tipo,
      vencimento: req.body.vencimento,
      observacao: req.body.observacao,
      pdf: req.body.pdf,
    });

    const response = {
      dados: {
        mensagem: "Documento Cadastrado com sucesso",
        documentoCriado: {
          id_documento: novo.id_documento,
          documento: novo.documento,
          request: {
            tipo: "GET",
            descricao: "Pesquisa um documento",
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
