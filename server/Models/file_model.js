// this defines the schema for the files used in the questions
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    }
});

module.exports = mongoose.model("File", fileSchema);