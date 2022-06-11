const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decodedToken.id;
  const id = req.params.id;
  if (id != userId) {
    return res.status(401).json({ error: "Request Unauthorized" });
  } else {
    next();
  }
};
