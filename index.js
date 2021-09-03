const express = require("express")
const bcrypt = require('bcryptjs')
const homeRouter = require("./routes/api/router")
const app = express()
const expressLayouts = require("express-ejs-layouts")

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//setting the template engine
app.set("view engine", "ejs")

app.use(expressLayouts)
app.set("layout","./layouts/layout")

//static 
app.use(express.static('public'))

//router middleware
app.use('/', homeRouter)



app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})