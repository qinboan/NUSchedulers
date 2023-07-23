const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const cors = require("cors")
const TimetableScheduleModel = require('./models/TimetableSchedule')

const port = 3001

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        origin: ["https://nuschedulers.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
))

app.use(express.json())

const mongooseUrl = "mongodb+srv://qinboan:ytKhpDqZszQf4bAW@users.ctm5dmj.mongodb.net/NUSchedulers?retryWrites=true&w=majority"
mongoose.connect(mongooseUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));


  
app.get("/", async (req, res) => {
    return res.json({
      message: "Server is up",
    });
});


app.post("/", async (req, res) => {
    const {username, password} = req.body;

    try {
        const checkUser = await UserModel.findOne({username:username})
        const check = await UserModel.findOne({username:username, password:password})

        if (check) {
            res.json("exists")
        } else if (checkUser) {
            res.json("userExists")
        } else {
            res.json("doesNotExist")
        }
    } catch(e) {
        res.json("fail")
    }
})

app.post("/create", async (req, res) => {
    const {username, password} = req.body;
    const data = {
        username:username,
        password:password
    }

    try {
        const check = await UserModel.findOne({username:username})

        if (check) {
            res.json("exists")
        } else {
            res.json("doesNotExist")
            await UserModel.insertMany([data])
        }
    } catch(e) {
        res.json("fail")
    }
})

app.post("/timetable", async (req, res) => {
    const { username, modules, timetableData } = req.body;
    const data = {
        username:username,
        modules:modules,
        timetableData:timetableData
    }
  
    try {
      // Find the user by username
      const user = await TimetableScheduleModel.findOne({ username: username });
  
      if (!user) {
        res.json("doesNotExist")
        await TimetableScheduleModel.insertMany(data)
        //return res.status(404).json("User not found");
      }
  
      // Update the user's timetable data with the new data
      else {
        user.modules = modules
        user.timetableData = timetableData
        await user.save()
        return res.json("Timetable data updated successfully")
      }
  
      
    } catch (e) {
      res.status(500).json("Failed to store timetable data");
    }
});

app.get("/timetable/:username", async (req, res) => {
    const { username } = req.params;
  
    try {
      // Find the user by username
      const user = await TimetableScheduleModel.findOne({ username: username });
  
      if (!user) {
        const empty = {
            username:"",
            timetableData:[],
            modules:[]
        }
        return res.json(empty);
      }
  
      // Return the timetable data of the user
      res.json(user);
    } catch (e) {
      res.status(500).json("Failed to fetch timetable data");
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`))