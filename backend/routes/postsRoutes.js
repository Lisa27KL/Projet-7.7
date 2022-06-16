const express = require("express");
const multer = require("../middlewares/multer");
const router = express.Router();
const postsCtrl = require("../controllers/postsController.js");
const authJwt = require("../middlewares/authJWT");
const authorization = require("../middlewares/authorizationPost");

router.post("/", authJwt.verifyToken, multer, postsCtrl.createPost);

router.get("/", authJwt.verifyToken, postsCtrl.findAllPosts);
router.get("/:id", authJwt.verifyToken, postsCtrl.findOnePost);

router.put(
  "/:id",
  authJwt.verifyToken,
  multer,
  authorization,
  postsCtrl.updatePost
);
router.delete("/:id", authJwt.verifyToken, authorization, postsCtrl.deletePost);

router.post("/:id/likes",authJwt.verifyToken, postsCtrl.addLikePost );
router.get("/:id/likes",authJwt.verifyToken, postsCtrl.likePost);

module.exports = router;
