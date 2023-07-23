const mongoose = require('mongoose')

const TimetableScheduleSchema = new mongoose.Schema({
    classNo: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    lessonType: {
        type: Array,
        required: true,
    }
})

const TimetableDataModel = mongoose.model("TimetableData", TimetableDataSchema)

module.exports = TimetableDataModel