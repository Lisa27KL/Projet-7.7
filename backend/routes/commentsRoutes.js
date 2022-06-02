const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsController.js");
const  authJwt  = require("../middlewares/authJWT");


router.post("/:postId",authJwt.verifyToken, commentsCtrl.createComment);
router.get("/",authJwt.verifyToken, commentsCtrl.findAllComments);
router.get("/:postId/:id",authJwt.verifyToken, commentsCtrl.findOneComment);
router.put("/:postId",authJwt.verifyToken, commentsCtrl.updateComment);
router.delete("/:id",authJwt.verifyToken, commentsCtrl.deleteComment);
router.delete("/",authJwt.verifyToken, commentsCtrl.deleteAllComments);

module.exports = router;
