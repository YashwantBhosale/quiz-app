const mongoose = require("mongoose");

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
	return this.create({
		title,
		question,
		options,
		correct_option,
		marks,
		quiz: quiz_id,
		attachments,
	});
};

questionSchema.statics.getQuestion = async function (question_id) {
	return this.find({ _id: question_id });
};

questionSchema.statics.getQuestions = async function (quiz_id) {
	return this.find({ quiz: quiz_id });
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
	return this.updateOne(
		{
			_id: question_id,
		},
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
