const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const cors = require("cors")

const port = 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(express.json())

const mongooseUrl = "mongodb+srv://qinboan:ytKhpDqZszQf4bAW@users.ctm5dmj.mongodb.net/NUSchedulers?retryWrites=true&w=majority"
mongoose.connect(mongooseUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

app.get("/getUsers", (req, res) => {
    // UserModel.find({}, (error, result) => {
    //     if (error) {
    //         res.json(error)
    //     }  else {
    //         res.json(result)
    //     }
    // })
})

app.post("/", async (req, res) => {
    const {username, password} = req.body;

    try {
        const check = await UserModel.findOne({username:username})

        if (check) {
            res.json("exists")
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
app.listen(port, () => console.log(`Server started on port ${port}`))