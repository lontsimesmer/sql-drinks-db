const User = require("../database/users");
const { verifyToken } = require("./jwt");

const authMiddleware = async function (req, res, next) {
  const authorization = req.get("Authorization");
  const token = authorization?.split(" ").pop();

  if (token) {
    try {
      const { data } = verifyToken(token);
      const user = await User.findById(data.id);
      if (!user) return res.sendStatus(401);
      req.user = user;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authMiddleware };
