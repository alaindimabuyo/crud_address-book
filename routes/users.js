const express = require('express')
//create routes
const router = express.Router();

//submit data
//@route  POST api/users
//@desc   Register a user
//@access Public
router.post('/', (req, res) => {
    res.send('Register a user');
})


//export the router

module.exports = router