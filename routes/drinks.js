const express = require("express");
const { Op, where } = require("sequelize");
const Drink = require("../database/drinks");
const router = express.Router();

router.get("/", async function (req, res) {
  const drinks = await Drink.findAll();
  res.send(drinks);
});

router.post("/", async (req, res) => {
  const { name, description, imageUrl, recipie } = req.body;
  const drink = await Drink.create({ name, description, imageUrl, recipie });
  res.send(drink);
});

router.get("/:id", async (req, res) => {
  const drink = await Drink.findByPk(req.params.id);
  res.json(drink);
});

router.put("/:id", async (req, res) => {
  const { name, description, imageUrl, recipie } = req.body;
  if (name && description && imageUrl && recipie) {
    await Drink.update(req.body, { where: { id: req.params.id } });
    const data = await Drink.findByPk(req.params.id);
    res.send(data);
  }
  res.send({ message: "Complete validation" });
});

router.patch("/:id", async (req, res) => {
  await Drink.update(req.body, { where: { id: req.params.id } });
  const infos = await Drink.findByPk(req.params.id);
  res.send(infos);
});

router.delete("/:id", async (req, res) => {
  await Drink.destroy({ where: { id: req.params.id } });
  res.send("Success");
});

module.exports = router;
