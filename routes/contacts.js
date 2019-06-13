const express = require('express')
//create routes
const router = express.Router();

//submit data
//@route  GET api/contacts
//@description   Get all users contacts 
//@access private
router.get('/', (req, res) => {
    res.send('Get all contacts');
})
//submit data
//@route  POST api/contacts
//@description   Auth user and get token
//@access private
router.post('/', (req, res) => {
    res.send('Add new contacts');
})
//submit data
//@route  PUT api/contacts/:id
//@description   update contact
//@access private
router.put('/:id', (req, res) => {
    res.send('Update Contact');
})
//submit data
//@route  DELETE api/contacts/:id
//@description   delete contact
//@access private
router.delete('/:id', (req, res) => {
    res.send('Delete Contact');
})



//export the router

module.exports = router