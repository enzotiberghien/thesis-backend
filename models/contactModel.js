const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a Name"]
  },
  lastName: {
    type: String,
    required: [true, "Please add a title"]
  },
  email: {
    type: String,
    required: [true, "Please add an email"]
  },
  phoneNumber: {
    type: String,
    required: [true, "Please add a phone number"]
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  }
}, {timestamps: true})

module.exports = mongoose.model("Contact", contactSchema)