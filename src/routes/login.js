/* Authentication: Creating a User model with Sequelize */
const { userData } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    userData
      .findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const msg = "This user if not existe";
          return res.status(400).json({ message: msg });
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const msg = `This password is incorrect`;
              return res.status(401).json({ message: msg, data: user });
            }

            // jwt
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "24h",
            });

            const msg = `The user has been logged in successfully`;
            return res.json({ message: msg, data: user, token: token });
          })
          .catch((error) => {
            const msg =
              "This user could not be connected, try again in which moment ";
            return res.status(401).json({ message: msg, data: error });
          });
      });
  });
};
