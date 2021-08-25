const express = require("express")
const bcrypt = require('bcryptjs')
const app = express()
const data = require('./data')
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//‘/', which returns the message "Welcome to our schedule website".
app.get("/", (req, res)=> {
    res.send("Welcome to our schedule website")
})


//‘/users’, which returns the list of users
app.get("/users", (req, res) => {
    res.send(data.users)
})


//‘/schedules’, which returns the list of schedules
app.get("/schedules", (req, res) => {
    res.send(data.schedules)
})


//the URL '/users/2' will return the information of user n°2
app.get("/users/:id", (req, res) => {
    res.send (data.users[parseInt (req.params.id)])
})

//the URL '/users/2/schedules' will return a list of all schedules for user n°2
app.get("/users/:id/schedules", (req, res) => {
    const id = parseInt(req.params.id)
    tempSchedules = data.schedules.filter(schedule => schedule.user_id === id)
    //console.log(tempSchedules)
    res.send(tempSchedules)
})


//‘/schedules’ to add a new schedule. It will return the newly created schedule.
app.post("/schedules", (req, res) => {
    const newSchedules = req.body
    data.schedules.push(newSchedules)
    res.send(data.schedules)
    
})


//‘/users’ (this time in POST!) to add a new user. It will return the newly created user. The user's password must be encrypted in bcrypt.
app.post("/users", (req, res) => {
    const { firstname, lastname, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    console.log(hash)
    const newUsers ={ firstname, lastname, email, password:hash }
    data.users.push(newUsers)
    res.send(data.users)
    
})













app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})