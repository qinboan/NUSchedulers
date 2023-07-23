const router = require('express').Router();
let User = require('../models/Users');

router.post('/').get(async (req, res) => {
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
});

router.route('/create').post(async (req, res) => {
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
});

module.exports = router;