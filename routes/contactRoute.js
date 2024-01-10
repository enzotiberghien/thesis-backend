const express = require("express")
const router = express.Router()
const { getContacts } = require("../controllers/contactController")

router.route("/").get(getContacts)

module.exports = router