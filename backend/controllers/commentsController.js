// const db = require("../models");
// const Comment = db.comments;
// const jwt = require("jsonwebtoken");

// // Create and Save a new Comment
// exports.createComment = (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
//   const userId = jwt.verify(token, process.env.MY_SECRET_TOKEN).id;

//   const comment = {
//     message: req.body.message,
//     userId: userId,
//     postId: req.params.postId,
//   };

//   Comment.create(comment)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Comment.",
//       });
//     });
// };

// // Retrieve all Comment from the database.
// exports.findAllComments = (req, res) => {
//   Comment.findAll()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving comments.",
//       });
//     });
// };

// // Find a single Post with an id
// exports.findOneComment = (req, res) => {
//   const id = req.params.id;
//   Comment.findByPk(id)
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Comment with id=${id}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving Comment with id=" + id,
//       });
//     });
// };

// // Update a Comment by the id in the request
// exports.updateComment = (req, res) => {
//   const id = req.params.id;
//   Comment.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Comment was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update Comment with id=${id} !`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Comment with id=" + id,
//       });
//     });
// };

// // Delete a Comment with the specified id in the request
// exports.deleteComment = (req, res) => {
//   const id = req.params.id;
//   Comment.destroy({
//     where: { id: id },
//   })
//     .then((comment) => {
//       if (comment == 1) {
//         res.send({
//           message: "Comment was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Comment with id=" + id,
//       });
//     });
// };

// // Delete all Comment from the database.
// exports.deleteAllComments = (req, res) => {
//   Comment.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((comments) => {
//       res.send({ message: `${comments} Comments were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Comments.",
//       });
//     });
// };
