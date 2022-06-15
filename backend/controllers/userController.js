const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

//************** SignUp
exports.signup = (req, res) => {
  User.create({
    pseudo: req.body.pseudo,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => res.status(201).json({ message: "User Created !" }))
    .catch((err) => {
      res.status(500).json({ message: err.errors[0].message });
    });
};


//************** LogIn
exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      bcrypt.compare(req.body.password, user.password)
      .then(valid =>{
        if (!valid){
          return res.status(401).send({accessToken: null, message: "Invalid Password !"})
        }})
          res.status(200).json({
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
            token: jwt.sign({ id: user.id }, process.env.MY_SECRET_TOKEN),
          })
          .catch((error) => res.status(500).json({ message: error }))
        })
    .catch((error) => res.status(500).json({ error }));
};

//************** Find All Users
exports.findAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

//************** Find One User
exports.findOneUser = (req, res) => {
  User.findByPk(req.params.id, {
    attributes: ["id", "pseudo", "email", "role", "image", "bio"],
  })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => res.status(400).json(`${err}`));
};



//************** Update User
exports.updateUser = (req, res) => {
  User.findOne({
    attributes: ["id", "pseudo", "email", "bio", "image"],
    where: { id: req.params.id },
  })
    .then((user) => {
      if (req.file && user.image != null) {
        const filename = user.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const userObject = {
            pseudo: req.body.pseudo,
            email: req.body.email,
            bio: req.body.bio,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          user
            .update({
              ...userObject,
            })
            .then(() => res.status(200).json({ message: "User modified" }))
            .catch((err) => res.status(400).json({ message: err }));
        });
      } else if (req.file) {
        user
          .update({
            pseudo: req.body.pseudo,
            email: req.body.email,
            bio: req.body.bio,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          })
          .then(() => res.status(200).json({ message: "User modified" }))
          .catch((err) => res.status(400).json({ message: err }));
      } else {
        user
          .update({
            pseudo: req.body.pseudo,
            email: req.body.email,
            bio: req.body.bio,
          })
          .then(() => res.status(200).json({ message: "User modified" }))
          .catch((err) => res.status(400).json({ message: err }));
      }
    })
    .catch((err) => res.status(400).json({ message: err }));
};



//************** Delete User
exports.deleteUser = (req, res) => {
  User.findByPk(req.params.id, {
    attributes: ["id"],
  })
    .then((user) => {
      if (user.image) {
        const filename = user.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          user
            .destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "User deleted" }))
            .catch((err) => res.status(400).json({ message: err }));
        });
      } else {
        user
          .destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "User deleted" }))
          .catch((err) => res.status(400).json({ message: err }));
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "This user doesn't exist !" });
    });
};
