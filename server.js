const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const cors = require('cors');


const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use("/contacts", require("./routes/contactRoute"))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))