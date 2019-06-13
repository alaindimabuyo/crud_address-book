const express = require('express')
//create routes
const router = express.Router();

//submit data
//@route  GET api/auth
//@description   Get logged a user
//@access private
router.get('/', (req, res) => {
    res.send('Get logged in user');
})
//submit data
//@route  POST api/auth
//@description   Auth user and get token
//@access public
router.post('/', (req, res) => {
    res.send('Log in user');
})



//export the router

module.exports = router