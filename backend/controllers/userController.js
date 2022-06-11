const db = require("../models");
var jwt = require("jsonwebtoken");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");


// SignUp
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    pseudo: req.body.pseudo,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};


// LogIn
exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.MY_SECRET_TOKEN);

      const authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          pseudo: user.pseudo,
          email: user.email,
          roles: authorities,
          token: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};


// Find one User
exports.findOneUser = (req, res) => {
  try {
    User.findByPk(req.params.id, {
      attributes: ["id", "pseudo", "email", "image", "bio"],
    }).then((user) => {
      res.status(200).json({ user });
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};


// Find all users
exports.findAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => res.status(400).send({ message: error.message }));
};


// Update User
module.exports.updateUser = (req, res) => {
  try {
  User.findOne({
    attributes: ["id", "pseudo", "email", "password", "image", "bio"],
    where: { id: req.params.id },
  })
    .then((user) => {
      if ( user.id == req.params.id) {
        user
          .update(
            {
              pseudo: req.body.pseudo,
              email: req.body.email,
              image: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null,
              bio: req.body.bio,
              // password: bcrypt.hashSync(req.body.password, 8),
            },
            { where: { id: user.id } }
          )
          .then(() => res.status(200).json({ message: "User Modified" }));
      } else {
        res.status(401).json({ message: "Unauthorized request !!" });
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "Unauthorizer" } + `${error}`)
    );
  }
  catch(error){ res.status(500).json({ message: "Unauthorizer" } + `${error}`)
    }
};


// Delete User
module.exports.deleteUser = (req, res) => {
  User.findByPk({
    attributes: ["id", "email"],
    where: { id: req.params.id },
  })

    .then((user) => {
      if (user.isAdmin === true || user.id === req.params.id) {
        User.destroy({ where: { id: user.id } });
        res.status(200).json({ message: "User" + req.params.id + "Successfully Deleted !" });
      }else if(!user) {
        res.status(404).json({ message: "User" + req.params.id + "has not been found !" });
      } else {
        res.status(401).json({ message: "Unauthorized request !!" });
      }
    })
    .catch((error) => res.status(500).json({ message: `${error}` }));
};