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
  res.send();
});

router.put("/:id", async function (req, res) {
  const ingredient = await Ingredient.findByPk(req.params.id);
  res.send(ingredient);
});

router.patch("/:id", async function (req, res) {
  res.send();
});

router.delete("/:id", async function (req, res) {
  res.send();
});

module.exports = router;
