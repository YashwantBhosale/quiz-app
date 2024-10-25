const Quiz = require("../Models/quiz_model");
const Question = require("../Models/question_model");

const getQuizById = async (req, res) => {
	try {
		const quiz_id = req.params.quiz_id;
		console.log(quiz_id);
		const quiz = await Quiz.findById(quiz_id);
		res.status(200).json({ quiz });
	}catch(e) {
		console.log(e);
		res.status(400).send(e.message);
	}
}

const addQuestion = async (req, res) => {
	try {
		const { title, question, options, correct_option, marks, attachments } =
			req.body;
		const quiz_id = req.params.quiz_id;
		const _question = await Question.createQuestion(
			title,
			question,
			options,
			correct_option,
			marks,
			quiz_id,
			attachments
		);
		res.status(200).json({ question: _question });
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
};

const addMultipleQuestions = async (req, res) => {
	try {
		const { questions } = req.body;
		const quiz_id = req.params.quiz_id;
		const _questions = [];
		for (let i = 0; i < questions.length; i++) {
			const { title, question, options, correct_option, marks, attachments } =
				questions[i];
			const _question = await Question.createQuestion(
				title,
				question,
				options,
				correct_option,
				marks,
				quiz_id,
				attachments
			);
			_questions.push(_question);
		}
		res.status(200).json({ questions: _questions });
	} catch (e) {
		console.log(e);
		res.status(400).send(e.message);
	}
};

const getQuizQuestions = async (req, res) => {
	try {
		const quiz_id = req.params.quiz_id;
		const quiz = Quiz.find({ _id: quiz_id });
		if (!quiz) throw new Error("Invalid Quiz Id");

		const _questions = await Question.getQuestions(quiz_id);
		res
			.status(201)
			.json({
				message: "Questions Fetched Successfully!",
				questions: _questions,
			});
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: e.message });
	}
};



module.exports = {
	addQuestion,
	addMultipleQuestions,
    getQuizQuestions,
	getQuizById
};
