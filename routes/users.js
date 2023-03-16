const express = require("express");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const { SALT_ROUNDS } = require("../services/constants");
const User = require("../database/users");
const Drink = require('../database/drinks');
const { authMiddleware } = require("../services/auth");

const router = express.Router();
/* Get users listing. */
router.get("/", async function (req, res) {
  const users = await User.findAll({include: Drink});
  res.send(users);
});

router.post("/", authMiddleware, function (req, res) {
  console.log(1);
  const { firstName, lastName, emailAddress, phone, password } = req.body;
  bcrypt.hash(password, SALT_ROUNDS, async function (err, hash) {
    console.log(2);
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      const user = await User.create({
        firstName,
        lastName,
        emailAddress,
        phone,
        password: hash,
        apiKey: uuid.v4(),
      });
      res.send(user);
    }
  });
});
router.get("/:id", async function (req, res) {
  const user = await User.findByPk(req.params.id, {include: Drink});
  res.send(user);
});

router.put("/:id", async function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } = req.body;
  if (firstName && lastName && emailAddress && phone && password) {
    await User.update(req.body, { where: { id: req.params.id } });
    const data = await User.findByPk(req.params.id);
    res.send(data);
  }
  res.send({ message: "Incomplete validation" });
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
