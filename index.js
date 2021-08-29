const express = require("express")
const bcrypt = require('bcryptjs')
const app = express()
const data = require('./data')
const expressLayouts = require("express-ejs-layouts")

const PORT = process.env.PORT || 3000


//setting template engine and layouts

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//setting the template engine
app.set("view engine", "ejs")

app.use(expressLayouts)
app.set("layout", "./layouts/layout")

app.use(express.static('public'))



app.use("", require("./routes/api/routing"))



app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})