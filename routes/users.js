const express = require("express");
//create routes
const router = express.Router();
//tokens
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//express validator
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const User = require("../modals/Users");
//submit data
//@route  POST api/users
//@desc   Register a user
//@access Public
router.post(
  "/",
  [
    //CHECK VALIDATION
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a  password with 6 or more characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //SET THE CHECKS for routes that will take data
    const errors = validationResult(req);
    //return bad request if fields in the json data are empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructure
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      //return bad request if a user exist
      if (user) {
        return res.status(400).json({ msg: "User already exist" });
      }
      //new instance of a user
      user = new User({
        name,
        email,
        password
      });

      //encrypt the password before saving it to the database
      const salt = await bcrypt.genSalt(10);
      //take plaintext password into a hash version
      user.password = await bcrypt.hash(password, salt);

      //save it to the database
      await user.save();
      //create a payload for the object you want to send in the token
      const payload = {
        user: {
          //get a specific data on users id
          id: user.id
        }
      };

      //generate a token
      //param values = payload, config, object of options tehn callback
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
