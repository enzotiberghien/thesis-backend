const express = require("express")
const router = express.Router()
const { getContacts, addContact, updatedContact, deleteContact } = require("../controllers/contactController")

router.route("/").get(getContacts).post(addContact)
router.route("/:id").put(updatedContact).delete(deleteContact)

module.exports = router