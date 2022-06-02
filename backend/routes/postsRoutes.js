const express = require("express");
const multer = require("../middlewares/multer");
const router = express.Router();
const postsCtrl = require("../controllers/postsController.js");
const authJwt  = require("../middlewares/authJWT");
const authorization = require("../middlewares/authorization");


router.post("/",authJwt.verifyToken,authorization, multer, postsCtrl.createPost);
router.get("/",authJwt.verifyToken, authorization, postsCtrl.findAllPosts);
router.get("/:id",authJwt.verifyToken,authorization, postsCtrl.findOnePost);
router.put("/:id",authJwt.verifyToken,multer, postsCtrl.updatePost);
router.delete("/:id",authJwt.verifyToken, postsCtrl.deletePost);
router.delete("/",authJwt.verifyToken, postsCtrl.deleteAllPost);
router.post("/:id/like", authJwt.verifyToken, postsCtrl.likeDislikePost);

module.exports = router;
