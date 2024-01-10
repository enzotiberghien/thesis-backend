const Contact = require("../models/contactModel")

// @desc Get contacts
// @route GET/api/contacts
const getContacts = (async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})


module.exports = {
  getContacts
}