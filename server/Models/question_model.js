const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    title: {
        type: String
    },
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            required: true,
        },
    ],
    attachments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        }
    ],
    correct_option: {
        type: Number,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
    },
});

module.exports = mongoose.model("Question", questionSchema);