
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Reminder', ReminderSchema);
