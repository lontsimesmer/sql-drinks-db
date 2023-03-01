var express = require("express");
const { getAllUsers } = require("../database/user");
const { findUserById } = require("../database/user");
const { InsertNewUser } = require("../database/user");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res) {
  const users = await getAllUsers();
  res.send(users);
});

router.post("/", async function (req, res) {
  const newUser = await InsertNewUser(req.body)
  console.log('this is id', newUser);
  const usser = await findUserById(newUser.insertId);
  res.send(usser);
});

router.get("/:id", async function (req, res) {
  const user = await findUserById(req.params.id);
  res.send(user);
});

router.put("/:id", function (req, res) {
  res.send("respond with a resource");
});

router.patch("/:id", function (req, res) {
  res.send("respond with a resource");
});

router.delete("/:id", function (req, res) {
  res.send("respond with a resource");
});

module.exports = router;
