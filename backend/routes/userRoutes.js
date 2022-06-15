const express = require("express");
const router = express.Router();

const authJwt = require("../middlewares/authJWT");
const userCtrl = require("../controllers/userController");
const validator = require("../middlewares/validator");
const multer = require("../middlewares/multer");
const authUser = require("../middlewares/authorizationUser");

router.post("/signup", validator.validator, userCtrl.signup);
router.post("/login",userCtrl.login);

router.get("/:id", authJwt.verifyToken, userCtrl.findOneUser);
router.get("/", authJwt.verifyToken, userCtrl.findAllUsers);

router.put("/:id", authJwt.verifyToken, authUser,multer, userCtrl.updateUser);
router.delete("/:id", authJwt.verifyToken, authUser,multer, userCtrl.deleteUser);

module.exports = router;
