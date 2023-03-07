const express = require("express");
const Glass = require("../database/glass");
const router = express.Router();

router.get("/", async function (req, res) {
  const glasses = await Glass.findAll({});
  res.send(glasses);
});

router.post("/", async function (req, res) {
  const { name, description } = req.body;
  const glass = await Glass.create({ name, description });
  res.send(glass);
});

router.get("/:id", async function (req, res) {
  const glass = await Glass.findByPk(req.params.id);
  res.send(glass);
});

router.put("/:id", async function (req, res) {
  const { name, description } = req.body;
  if (name && description) {
    await Glass.update(req.body, { where: { id: req.params.id } });
    const data = await Glass.findByPk(req.params.id);
    res.send(data);
  }
  res.send({ message: "Validation incomplete." });
});

router.patch("/:id", async function (req, res) {
  await Glass.update(req.body, { where: { id: req.params.id } });
  const data = await Glass.findByPk(req.params.id);
  res.send(data);
});

router.delete("/:id", async function (req, res) {
  await Glass.destroy({ where: { id: req.params.id } });
  res.send("success");
});

module.exports = router;
