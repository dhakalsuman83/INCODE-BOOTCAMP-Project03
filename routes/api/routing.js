const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const data = require("../../data")



//‘/', which returns the message "Welcome to our schedule website".
router.get("/", (req, res)=> {
    res.render("./pages/home")
})


//‘/users’, which returns the list of users
router.get("/users", (req, res) => {
    res.render("./pages/users", {
        msg: "",
        users : data.users
    })
})


//‘/schedules’, which returns the list of schedules
router.get("/schedules", (req, res) => {
    res.render("./pages/schedules" , {
        schedules: data.schedules})
})

router.get("/users/new", (req, res) => {
    res.render("./pages/user-form")

})

router.get("/users/:id", (req, res) => {
    res.render("./pages/specific-user", {
        user: data.users[parseInt(req.params.id)]
    })
        
})

//the URL '/users/2/schedules' will return a list of all schedules for user n°2
router.get("/users/:id/schedules", (req, res) => {
    const id = parseInt(req.params.id)
    tempSchedules = data.schedules.filter(schedule => schedule.user_id === id)
    //console.log(tempSchedules)
    res.render("./pages/specific-schedules", {
        tempSchedules
    })
})


router.post("/users/new", (req, res) => {
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

module.exports = router