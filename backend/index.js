const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const port = 3000

const app = express()

mongoose.connect("mongodb+srv://qinboan:ytKhpDqZszQf4bAW@users.ctm5dmj.mongodb.net/?retryWrites=true&w=majority")

app.listen(port, () => console.log(`Server started on port ${port}`))