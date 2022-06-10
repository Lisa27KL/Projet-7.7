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
  Post.findAll({ include: ["comments"] })
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

// Update a Post by the id in the request
//  exports.updatePost = (req, res) => {
//     const id = req.params.id;
//   Post.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Post was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Post with id=" + id
//       });
//     });
// };

exports.updatePost = (req, res) => {
  const id = req.params.id;

    Post.findOne({
      where: { id: id },})

  .then((post) => {
    if (req.file) {
      if(post.image !== null){
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const postObject = {
            // ...JSON.parse(req.body.post),
            message: req.body.message,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename}`,
            }
            console.log('sousou')
            post.update({ ...postObject })
          .then(() => res.status(200).json({ message: "Post modified !" }))
          .catch((error) => res.status(400).json({ message: error }));
        });
          
      }else{
        console.log("toutou")
            const postObject = { ...req.body };
            post.update({ ...postObject })
              .then(() => res.status(200).json({ message: "Post modified !" }))
              .catch((error) => res.status(400).json({ message: error }));
      }
    }else {
      post.update(req.body.post)
      .then(() => res.send({
       message: "Post was updated successfully."
      }))
      .catch((error) => res.status(400).json({ message: error }));
    }
      })

  .catch(err => {
    res.status(500).send({
      message: "Error updating Post with id=" + id
    });
  });
};

// exports.updatePost = (req, res) => {
//   const id = req.params.id;

  // If image is modified -> delete the old one
//   Post.findOne(id)
//     .then((post) => {
//       if (req.file) {
//         const filename = post.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, () => {
//           const postObject = {
//             ...JSON.parse(req.body.post),
//             imageUrl: `${req.protocol}://${req.get("host")}/images/${
//               req.file.filename
//             }`,
//           };
//           Post.update({ _id: req.params.id }, { ...postObject })
//             .then(() => res.status(200).json({ message: "Post modified !" }))
//             .catch((error) => res.status(400).json({ message: "error1" }));
//         });
//       } else {
//         // If the image is not modified
//         const postObject = { ...req.body };
//         Post.update({ _id: req.params.id }, { ...postObject })
//           .then(() => res.status(200).json({ message: "Post modified !" }))
//           .catch((error) => res.status(400).json({ message: "error2" }));
//       }
//     })
//     .catch((error) => res.status(500).json({ message: "error3" }));
// };

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
          message: `Cannot delete Post with id` + `${id}`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id" + `${id}`,
      });
    });
};

// Delete all Post from the database.
exports.deleteAllPost = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false,
  })
    .then((posts) => {
      res.send({ message: `${posts} Posts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all posts.",
      });
    });
};

// Like or Dislike a Post
exports.likeDislikePost = (req, res) => {
  if (req.body.like === 1) {
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then(() =>
        res.status(201).json({ message: "GREAT ! You like this Post !" })
      )
      .catch((error) => res.status(400).json({ message: error }));
  } else if (req.body.like === -1) {
    Post.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then(() =>
        res.status(201).json({ message: "OH NO ! You don't like this Post !" })
      )
      .catch((error) => res.status(400).json({ message: error }));
  } else {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.usersLiked.includes(req.body.userId) && req.body.like !== -1) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
            }
          )
            .then(() => res.status(201).json({ message: "No more like !!" }))
            .catch((error) => res.status(400).json({ message: error }));
        } else if (
          post.usersDisliked.includes(req.body.userId) &&
          req.body.like !== -1
        ) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            }
          )
            .then(() => res.status(201).json({ message: "No more dislike" }))
            .catch((error) => res.status(400).json({ message: error }));
        }
      })
      .catch((error) => res.status(404).json({ message: error }));
  }
};
