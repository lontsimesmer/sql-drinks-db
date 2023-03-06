const express = require("express");
const Category = require("../database/category");
const router = express.Router();

/* Get users listing. */
router.get("/", async (req, res) => {
  const categories = await Category.findAll({});
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.create({
    name,
    description,
  });
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    await Category.update(req.body, { where: { id: req.params.id } });
    const data = await Category.findByPk(req.params.id);
    res.send(data);
  }
  res.send({ message: "Incomplete validation" });
});

router.patch("/:id", async (req, res) => {
  await Category.update(req.body, { where: { id: req.params.id } });
  const infos = await Category.findByPk(req.params.id);
  res.send(infos);
});

router.delete("/:id", async (req, res) => {
  await Category.destroy(req.body, { where: { id: req.params.id } });
  res.send("Succeeded");
});

module.exports = router;
