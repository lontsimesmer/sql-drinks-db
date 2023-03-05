const express = require("express");
const { Op, where } = require("sequelize");
const Drink = require("../database/drinks");
const router = express.Router();

router.get("/", async function (req, res) {
  const drinks = await Drink.findAll();
  res.json(drinks);
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
  res.send({message: "Incomplete validation"});
});

router.patch("/:id", async (req, res) => {
  const drink = await Drink.create(req.body);
  res.json(drink);
});

router.delete("/:id", async (req, res) => {
  const drink = await Drink.create(req.body);
  res.json(drink);
});
