const express = require('express')
const router = express.Router()
const week = require("../../helper/weekdays")

const db = require('../../database')


//handler to create the new schedules
router.get('/new', (req, res) => {
    try {
        res.render("./pages/schedules-form", {
            weeks:week
        }) //renders the form page
    } catch (error) {
        console.error(error.message)
    }
    
})



router.get("/", async (req, res) => {
    const newData = await db.query('SELECT * FROM schedule'); //selects all the data from the table users
    // console.log(newData)
    // res.json(newData);
    //console.log(newData[0].day)
    newData.forEach(n => {
        n.day = week.find(nn => nn.id == n.day)
        n.start_at = time(n.start_at)
        n.end_at=time(n.end_at)
    })

    res.render('./pages/table', {
        schedules: newData
    });
});

// router.get("/schedule/:id", async(req, res) => {
//     const newData = await db.query('SELECT * FROM schedule');
//     res.render('./pages/sss', {
//         schedule : newData[Number(req.params.id)]
//     })
    
// })


router.post("/new",async (req, res) => {
    try {
        let {username, day, start_at, end_at } = req.body
        // start_at = time(start_at);
        // end_at = time(end_at);
        let newData = (await db.query(
            //`INSERT INTO users (user_id,day,start_at,end_at) VALUES('${user_id}', '${day}', '${start_at}', '${end_at}')`
            `INSERT INTO schedule (username,day,start_at,end_at) VALUES($1,$2,$3,$4) RETURNING *`,
                [username, day, start_at, end_at]
        ));
        res.redirect('/new')
    } catch (error) {
        console.error(error.message)
    };
    
});


// A function to concert the 24 hr format time in am and pm
function time(time) {
    temp = time.split(":")[0]
    if (Number(temp) == 0) return (`12:${time.split(":")[1]}:${time.split(":")[2]}` + "AM")
    else {
        if (Number(temp) > 0 && Number(temp) < 12) { 
            time += "AM"
            return (`${temp}:${time.split(":")[1]}:${time.split(":")[2]}`)
        } else if(Number(temp) == 12) {
            time += "PM"
            return (`${Number(temp)}:${time.split(":")[1]}:${time.split(":")[2]}`)
        } else {
            time += "PM"
            return (`${Number(temp)-12}:${time.split(":")[1]}:${time.split(":")[2]}`)
        }
    }
}


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



// <% switch(Number(schedule.day)){ %>
//     <%case 1:%>
//      <%schedule.day="Monday";%>
//      <%break;%>

//     <%case 2:%>
//      <%schedule.day="Tuesday";%>
//      <%break;%>
    
//     <%case 3:%>
//      <%schedule.day="Wednesday";%>
//      <%break;%>
    
//     <%case 4:%>
//      <%schedule.day="Thursday";%>
//      <%break;%>
    
//     <%case 5:%>
//      <%schedule.day="Friday";%>
//      <%break;%>
    
//     <%case 6:%>
//      <%schedule.day="Saturday";%>
//      <%break;%>
    
//     <%case 7:%>
//      <%schedule.day="Sunday";%>
//      <%break;%>
    
// <% }; %> 

