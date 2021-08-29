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
app.set("layout","./layouts/layout")



//‘/', which returns the message "Welcome to our schedule website".
app.get("/", (req, res)=> {
    res.render("./pages/home")
})


//‘/users’, which returns the list of users
app.get("/users", (req, res) => {
    res.render("./pages/users", {
        msg: "",
        users : data.users
    })
})


//‘/schedules’, which returns the list of schedules
app.get("/schedules", (req, res) => {
    res.render("./pages/schedules" , {
        schedules: data.schedules})
})

app.get("/users/new", (req, res) => {
    res.render("./pages/user-form")

})

app.get("/users/:id", (req, res) => {
    res.render("./pages/specific-user", {
        user: data.users[parseInt(req.params.id)]
    })
        
})

//the URL '/users/2/schedules' will return a list of all schedules for user n°2
app.get("/users/:id/schedules", (req, res) => {
    const id = parseInt(req.params.id)
    tempSchedules = data.schedules.filter(schedule => schedule.user_id === id)
    //console.log(tempSchedules)
    res.render("./pages/specific-schedules", {
        tempSchedules
    })
})


app.post("/users/new", (req, res) => {
    // const newUser = req.body
    // console.log(newUser)
    // data.users.push(newUser)
    // console.log(data.users)
    const { firstname, lastname, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    // console.log(hash)
    const newUsers = { firstname, lastname, email, password: hash }
    data.users.push(newUsers)
    res.render("./pages/users", {
        msg: "Details of the users with the added details",
        users: data.users
    })

})



//‘/schedules’ to add a new schedule. It will return the newly created schedule.
// app.post("/schedules", (req, res) => {
//     const newSchedules = req.body
//     data.schedules.push(newSchedules)
//     res.send(data.schedules)
    
// })


// //‘/users’ (this time in POST!) to add a new user. It will return the newly created user. The user's password must be encrypted in bcrypt.
// app.post("/users", (req, res) => {
//     const { firstname, lastname, email, password } = req.body
//     const salt = bcrypt.genSaltSync(10)
//     const hash = bcrypt.hashSync(password, salt)
//     console.log(hash)
//     const newUsers ={ firstname, lastname, email, password:hash }
//     data.users.push(newUsers)
//     res.send(data.users)
    
// })







app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})