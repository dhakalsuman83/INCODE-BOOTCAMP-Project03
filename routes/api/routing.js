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
    res.render("./pages/schedules", {
        msg: "",
        schedules: data.schedules})
})

router.get("/users/new", (req, res) => {
    res.render("./pages/user-form", {
        users:data.users
    })

})

router.get("/users/:id", (req, res) => {
    res.render("./pages/specific-user", {
        user: data.users[parseInt(req.params.id)]
    })
        
})

router.get("/schedules/new", (req, res) => {
    res.render("./pages/schedules-form")
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

router.post("/schedules/new", (req, res) => {
    let {user_id,day,start_at,end_at} = req.body
    start_at = time(start_at)
    end_at = time(end_at)
    data.schedules.push({user_id,day,start_at,end_at})
    res.render("./pages/schedules", {
        msg: "All available Schedules",
        schedules: data.schedules
    })
})


function time(time) {
    temp = time.split(":")[0]
    if (Number(temp) == 0) return (`12:${time.split(":")[1]}` + "AM")
    else {
        if (Number(temp) > 0 && Number(temp) < 12) { 
            time += "AM"
            return (`${temp}:${time.split(":")[1]}`)
        } else if(Number(temp) == 12) {
            time += "PM"
            return (`${Number(temp)}:${time.split(":")[1]}`)
        } else {
            time += "PM"
            return (`${Number(temp)-12}:${time.split(":")[1]}`)
        }
    }
    
    
}

// function time(time) {
//     console.log(time)
//     let hour = time.split(':')[0];
//     Number(hour) <= 12 ? (time += ' AM') : (time += ' PM');
//     hour = Number(hour) % 12;
//     Number(hour) === 0 ? (hour = 12) : hour = hour;
//     hour = hour < 10 ? '0' + hour : hour;
//     return `${hour}:${time.split(':')[1]}`;

// }

module.exports = router



