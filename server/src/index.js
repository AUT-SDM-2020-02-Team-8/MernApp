'use strict'

const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://mongo:27017/mernapp_dev"

const users = require("./routes/api/users")
const evidences = require("./routes/api/evidences")

const app = express()

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

// // DB Config
// const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true }) // Adding new mongo url parser
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize())

// Passport config
require("./config/passport")(passport)

// Routes
app.use("/api/users", users)
app.use("/api/evidences", evidences)

const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0'

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build')

app.use(express.static(CLIENT_BUILD_PATH))


app.get('*', function(request, response) {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'))
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
