const express = require("express");
const { Op, where } = require("sequelize");
const User = require("../database/users");
const router = express.Router();

/* Get users listing. */
router.get("/", async function (req, res) {
  const users = await User.findAll({});
  res.send(users);
});

router.post("/", async function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    emailAddress,
    phone,
    password,
    apiKey: Date.now(),
  });
  res.send(user);
});

router.get("/:id", async function (req, res) {
  const user = await User.findByPk(req.params.id);
  res.send(user);
});

router.put("/:id", async function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } = req.body;
  if (firstName && lastName && emailAddress && phone && password) {
    await User.update(req.body, { where: { id: req.params.id } });
    const data = await User.findByPk(req.params.id);
    res.send(data);
  }
  res.send({ message: "incomplete validation" });
});

router.patch("/:id", async function (req, res) {
  await User.update(req.body, { where: { id: req.params.id } });
  const infos = await User.findByPk(req.params.id);
  res.send(infos);
});

router.delete("/:id", async function (req, res) {
  await User.destroy({ where: { id: req.params.id } });
  res.send("success");
});

module.exports = router;

/* const express = require("express");
const { getAllUsers, updateUserId, patchUsers, deleteUsers } = require("../database/user");
const { findUserById } = require("../database/user");
const { insertNewUser } = require("../database/user");
const router = express.Router(); */

/* GET users listing. */
/* router.get("/", async function (req, res) {
  const users = await getAllUsers();
  res.send(users);
});

router.post("/", async function (req, res) {
  const newUser = await insertNewUser(req.body);
  console.log("this is id", newUser);
  const usser = await findUserById(newUser.insertId);
  res.send(usser);
});

router.get("/:id", async function (req, res) {
  const user = await findUserById(req.params.id);
  res.send(user);
});

router.put("/:id", async function (req, res) {
  const update = await updateUserId(req.params.id);
  res.send(update);
});

router.patch("/:id", async function (req, res) {
  const patch = await patchUsers(req.params.id);
  res.send(patch);
});

router.delete("/:id", async function (req, res) {
  const deletAll = await deleteUsers(req.params.id)
  res.send(deletAll);
});

module.exports = router; */
