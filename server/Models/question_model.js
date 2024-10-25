const mongoose = require("mongoose");
const Quiz = require("./quiz_model");

const questionSchema = new mongoose.Schema({
	title: {
		type: String,
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
			ref: "File",
		},
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

questionSchema.statics.createQuestion = async function (
	title,
	question,
	options,
	correct_option,
	marks,
	quiz_id,
	attachments
) {
	const quiz = await Quiz.findOne({ _id: quiz_id });
	if (!quiz) {
		throw new Error("Quiz not found! Invalid id");
	}

	const newQuestion = await this.create({
		title,
		question,
		options,
		correct_option,
		marks,
		quiz: quiz_id,
		attachments,
	});

	quiz.questions.push(newQuestion._id);
	await quiz.save();

	return newQuestion;
};

questionSchema.statics.getQuestion = async function (question_id) {
	return this.find({ _id: question_id });
};

questionSchema.statics.getQuestions = async function (quiz_id) {
	console.log("quiz_id: ", quiz_id);
	const questions = await this.find({ quiz: quiz_id });
	console.log(questions);
	return questions;
};

questionSchema.statics.updateQuestion = async function (
	question_id,
	title,
	question,
	options,
	correct_option,
	marks,
	attachments
) {
	const _quiz = await Quiz.findOne({ _id: quiz_id });
	if (!_quiz) {
		throw new Error("Quiz not found! Invalid id");
	}

	return this.findOneAndUpdate(
		{ _id: question_id },
		{
			title,
			question,
			options,
			correct_option,
			marks,
			attachments,
		}
	);
};

questionSchema.statics.deleteQuestion = async function (question_id) {
    return this.deleteOne({ _id: question_id });
};


module.exports = mongoose.model("Question", questionSchema);
