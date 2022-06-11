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
      if (req.file) {
        if (post.image !== null) {
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            const postObject = {
              // ...JSON.parse(req.body.post),
              message: req.body.message,
              image: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            };
            console.log("sousou");
            post
              .update({ ...postObject })
              .then(() => res.status(200).json({ message: "Post modified !" }))
              .catch((error) => res.status(400).json({ message: error }));
          });
        } else {
          console.log("toutou");
          const postObject = { ...req.body };
          post
            .update({ ...postObject })
            .then(() => res.status(200).json({ message: "Post modified !" }))
            .catch((error) => res.status(400).json({ message: error }));
        }
      } else {
        post
          .update(req.body.post)
          .then(() =>
            res.send({
              message: "Post was updated successfully.",
            })
          )
          .catch((error) => res.status(400).json({ message: error }));
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
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