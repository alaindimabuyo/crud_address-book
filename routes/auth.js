const express = require("express");
//create routes
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../modals/Users");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
//submit data
//@route  GET api/auth
//@description   Get logged a user
//@access private
router.get("/", auth, async (req, res) => {
  try {
    //use the findbyid method that reutnrs a promise to look for the users id if the token is correct
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//submit data
//@route  POST api/auth
//@description   Auth user and get token
//@access public

router.post(
  "/",
  [
    //check validation
    check("email", "Please include a email").isEmail(),
    check("password", "Please enter a password").exists()
  ],
  async (req, res) => {
    //check to see if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructure
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //if theres no user with a specified email
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      //if theres a user check the password and use bcypt compare method
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        //if they dont math return a bad request
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      //if match return jwt sign payload
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//export the router

module.exports = router;
