const connection = require(".");

function groupUsersDrinks(rows) {
  const users = {};
  const ids = new Set();
  rows.forEach(({ id, name, ...drink }) => {
    if (user[id]) {
      users[id].drinks.push(drink);
    } else {
      users[id] = { id, name, drinks: [drink] };
    }
    ids.add(id);
  });
  return Array.from(ids).map((id) => users[id]);
}

async function getAllUsers() {
  const [result] = await connection.query(
    "SELECT u.id, u.name, d.id as drink_db, d.name as drink_name from users as u join drinks as d on d.user_id = u.id order by u.id ASC;"
  );
  return groupUsersDrinks(result);
}

async function findUserById(id, limit = 1) {
  const [[user]] = await connection.query(
    `SELECT * from users where id=? LIMIT ?;`,
    [id, limit]
  );
  connection.execute();
  return user;
}

async function InsertNewUser(info) {
  const [usser] = await connection.query(
    `INSERT INTO users(name, password, api_key, phone, email) VALUES(?, ?, ?, ?, ?);`,
    [info.name, info.password, info.api_key, info.phone, info.email]
  );
  return usser;
}

module.exports = {
  getAllUsers,
  findUserById,
  InsertNewUser,
};
