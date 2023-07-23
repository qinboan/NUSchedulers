const mongoose = require('mongoose')

const TimetableScheduleSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    modules: {
        type: Array,
        required: true,
    },
    timetableData: {
        type: Array,
        required: true,
    }
})

const TimetableScheduleModel = mongoose.model("TimetableSchedule", TimetableScheduleSchema)

module.exports = TimetableScheduleModel