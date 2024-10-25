const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startsAt: {
        type: Date,
        required: true,
    },
    endsAt: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    total_marks: {
        type: Number,
        required: true,
    },
    passing_marks: {
        type: Number,
        required: true,
    },
    max_attempts: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
	questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Question",
		},
	],
    attempts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attempt",
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
});

quizSchema.statics.createQuiz = async function (title, subject, description, startsAt, endsAt, duration, total_marks, passing_marks, max_attempts, createdBy) {
    const newQuiz = new this({
        title,
        subject,
        description,
        startsAt,
        endsAt,
        duration,
        total_marks,
        passing_marks,
        max_attempts,
        createdBy
    });
    const quiz = await newQuiz.save();
    return quiz;
}

quizSchema.statics.getPopulatedQuiz = async function (quizId) {
    const quiz = await this.findById(quizId).populate({
        path: "questions",
        select: "-correct_option"
    });
 
    return quiz;
}

module.exports = mongoose.model("Quiz", quizSchema);