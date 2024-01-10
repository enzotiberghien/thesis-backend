const Contact = require("../models/contactModel")

// @desc Get contacts
// @route GET/contacts
const getContacts = (async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})


// @desc Add a Contact
// @route POST/contacts
const addContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address } = req.body
    const contactExist = await Contact.findOne({ $and: [{ firstName }, { lastName }, { address }] })

    if (contactExist) {
      return res.status(409).json({ error: "Contact already exists" })
    }

    const contact = await Contact.create({ firstName, lastName, email, phoneNumber, address })
    res.status(201).json(contact)

  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
}


// @desc Update a contact
// @route PUT/api/contacts/:id
const updatedContact = (async (req, res) => {
  try {
    const { id } = req.params
    const contact = await Contact.findOne({ _id: id })

    if (!contact) {
      return res.status(404).json({ error: `The contact of id ${id} does not exsits` })
    }

    const updatedContact = await Contact.findOneAndUpdate({ _id: id }, req.body, { new: true })

    res.status(200).json(updatedContact)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})


// @desc Delete a contact
// @route DELETE/contacts/:id
const deleteContact = (async (req, res) => {
  try {
    const { id } = req.params
    const contact = await Contact.findOne({ _id: id })

    if (!contact) {
      return res.status(404).json({ error: `The Contact of id ${id} does not exists` })
    }

    const deletedContact = await Contact.findOneAndDelete({ _id: id })

    res.status(200).json(deletedContact)

  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})


module.exports = {
  getContacts,
  addContact,
  updatedContact,
  deleteContact
}