const express = require("express");
//create routes
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const User = require("../modals/Users");
const Contact = require("../modals/Contact");

//submit data
//@route  GET api/contacts
//@description   Get all users contacts
//@access private
router.get("/", auth, async (req, res) => {
  //pull from database
  try {
    //date - 1 for most recent contact
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Errors");
  }
});
//submit data || add new contacts
//@route  POST api/contacts
//@description   Auth user and get token
//@access private
//use multiple brackets for multiple middlwares
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    //validates
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructure
    const { name, email, phone, type } = req.body;
    //pull out the data from the body
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//submit data
//@route  PUT api/contacts/:id
//@description   update contact
//@access private
router.put("/:id", auth, async (req, res) => {
  //destructure || pull out the data from body
  const { name, email, phone, type } = req.body;

  // initialize array
  const contactFields = {};
  //Build Contact Object
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    //if contact is not found
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //make sure user owns a contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized " });
    }

    //update
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    //if contact doesnt exist lets just create it by using new true
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//submit data
//@route  DELETE api/contacts/:id
//@description   delete contact
//@access private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    //if contact is not found
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //make sure user owns a contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized " });
    }

    await Contact.findByIdAndRemove(req.params.id);

    //if contact doesnt exist lets just create it by using new true
    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//export the router

module.exports = router;
