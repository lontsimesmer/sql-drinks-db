const express = require("express");
const Ingredient = require("../database/ingredient");
const router = express.Router();

router.get("/", async function (req, res) {
  const ingredients = await Ingredient.findAll({});
  res.send(ingredients);
});

router.post("/", async function (req, res) {
  const { name, description } = req.body;
  const ingredient = await Ingredient.create({ name, description });
  res.send(ingredient);
});

router.get("/:id", async function (req, res) {
  const ingredient = await Ingredient.findByPk(req.params.id);
  res.send(ingredient);
});

router.put("/:id", async function (req, res) {
  const { name, description } = req.body;
  if (name && description) {
    await Ingredient.update(req.body, { where: { id: req.params.id } });
    const data = await Ingredient.findByPk(req.params.id);
    res.send(data);
  }
  res.send({ message: "Incomplete validation" });
});

router.patch("/:id", async function (req, res) {
  await Ingredient.update(req.body, { where: { id: req.params.id } });
  const infos = await Ingredient.findByPk(req.params.id);
  res.send(infos);
});

router.delete("/:id", async function (req, res) {
  await Ingredient.destroy({ where: { id: req.params.id } });
  res.send("success");
});

module.exports = router;
