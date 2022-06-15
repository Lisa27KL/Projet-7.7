const db = require("../models");
const Post = db.posts;
const fs = require("fs");
const jwt = require("jsonwebtoken");

// Create and Save a new Post
exports.createPost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.verify(token, process.env.MY_SECRET_TOKEN).id;

  Post.create({
    message: req.body.message,
    image: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
    userId: userId,
  })
    .then((post) => {
      post.save().then(() =>
        res.status(201).json({
          message: req.body.message,
          image: req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null,
          userId: userId,
        })
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};

// Retrieve all Post from the database.
exports.findAllPosts = (req, res) => {
  Post.findAll({ include: ["comments"], order: [["createdAt", "DESC"]] })
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Post with an id
exports.findOnePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id, { include: ["comments"] })
    .then((post) => {
      if (post) {
        res.send(post);
      } else {
        res.status(404).send({
          message: `Cannot find Post with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

exports.updatePost = (req, res) => {
  const id = req.params.id;

  Post.findOne({
    where: { id: id },
  })
  .then((post) => {
    if (req.file && post.image != null) {
      const filename = post.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        const postObject = {
          message: req.body.message,
          image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
        post
          .update({ ...postObject })
          .then(() => {
            res.json({
              message: req.body.message,
              image: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Error while upddating Post with id=" + id,
            });
          });
      });
    } else if (req.file) {
      post
        .update({
          message: req.body.message,
          image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        })
        .then(() => {
          res.json({
            message: req.body.message,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error while upddating Post with id=" + id,
          });
        });
    } else {
      post
        .update({
          message: req.body.message,
        })
        .then(() => {
          res.json({
            message: req.body.message,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error updating Post with id=" + id,
          });
        });
    }
  });
};

// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.destroy({
    where: { id: id },
  })
    .then((post) => {
      if (post == 1) {
        res.status(200).send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Post with id` + `${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id" + `${id}`,
      });
    });
};
