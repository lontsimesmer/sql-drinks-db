const Sequelize = require("sequelize");

const sequelize = new Sequelize("rebase_drink_db", "mesmer", "nathanael.1990", {
  host: "db4free.net",
  dialect: "mysql",
});

module.exports = sequelize;

/* const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "drinks_db",
}); */
