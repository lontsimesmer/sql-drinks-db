const express = require("express");
const router = express.Router();

/* const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("rebase_drinks_db", "rebase", "warrior98", {
  host: "db4free.net",
  dialect: "mysql",
});

module.exports = sequelize; */

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
