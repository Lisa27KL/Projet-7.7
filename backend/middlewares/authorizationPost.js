const jwt = require("jsonwebtoken");
const db = require("../models");
const Post = db.posts;

module.exports = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.MY_SECRET_TOKEN);
      const userId = decodedToken.id;
      if (post.userId !== userId) {
        return res.status(401).json({ error: "Request Unauthorized !" });
      } else {
        next();
      }
    })
    .catch((error) => res.status(401).json(`${error}`));
};
