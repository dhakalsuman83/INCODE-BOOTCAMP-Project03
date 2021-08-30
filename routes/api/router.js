const express = require('express')
const router = express.Router()


const { users, schedules } = require("../../data")
const pgp = require("../../database")



router.get("/", (req, res) => {
    res.render("./pages/user-form")
})


module.exports = router


// //‘/', which returns the message "Welcome to our schedule website".
// app.get("/", (req, res)=> {
//     res.render("./pages/home")
// })


// //‘/users’, which returns the list of users
// app.get("/users", (req, res) => {
//     res.render("./pages/users", {
//         users : data.users
//     })
// })


// //‘/schedules’, which returns the list of schedules
// app.get("/schedules", (req, res) => {
//     res.render("./pages/schedules" , {
//         schedules: data.schedules})
// })


// //the URL '/users/2' will return the information of user n°2
// app.get("/users/:id", (req, res) => {
//     input = req.params.id
//     if (input === "new") {
//         res.render("./pages/user-form")
//     } else {
//     res.render("./pages/specific-user", {
//         user : data.users[parseInt(req.params.id)]
//     })
//     }
        
    
// })

// //the URL '/users/2/schedules' will return a list of all schedules for user n°2
// app.get("/users/:id/schedules", (req, res) => {
//     const id = parseInt(req.params.id)
//     tempSchedules = data.schedules.filter(schedule => schedule.user_id === id)
//     //console.log(tempSchedules)
//     res.render("./pages/specific-schedules", {
//         tempSchedules
//     })
// })



// //‘/schedules’ to add a new schedule. It will return the newly created schedule.
// // app.post("/schedules", (req, res) => {
// //     const newSchedules = req.body
// //     data.schedules.push(newSchedules)
// //     res.send(data.schedules)
    
// // })


// // //‘/users’ (this time in POST!) to add a new user. It will return the newly created user. The user's password must be encrypted in bcrypt.
// // app.post("/users", (req, res) => {
// //     const { firstname, lastname, email, password } = req.body
// //     const salt = bcrypt.genSaltSync(10)
// //     const hash = bcrypt.hashSync(password, salt)
// //     console.log(hash)
// //     const newUsers ={ firstname, lastname, email, password:hash }
// //     data.users.push(newUsers)
// //     res.send(data.users)
    
// // })
