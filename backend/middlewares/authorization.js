const jwt = require("jsonwebtoken");
const model = require("../models");


module.exports = (req, res, model, next) => {
  model
    .findOne({ _id: req.params.id })
    .then((model) => {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.MY_SECRET_TOKEN);
      const userId = decodedToken.userId;
      if (model.userId !== userId) {
        return res.status(401).json({ error: "Inauthorized Request" });
      } else {
        next();
      }
    })
    .catch((error) => res.status(401).json({ error: "Not Found" }));
};