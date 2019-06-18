const jwt = require("jsonwebtoken");
const config = require("config");

// you always need next parameter to move on to the next piece of middleware
module.exports = function(req, res, next) {
  //get token from the header
  const token = req.header("x-auth-token");
  //check if theres no token
  if (!token) {
    return res.status(401).json({ msg: "No Token Access Denied" });
  }

  //VERIFY
  try {
    // if theres a token were gonna verify it and pull the payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //once the payload is dacoded, take the user to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    //RETURN bad request if it doesnt verify
    res.status(400).json({ msg: "Token is not valid" });
  }
};
