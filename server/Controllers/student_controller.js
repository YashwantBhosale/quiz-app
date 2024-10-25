const Student = require("../Models/student_model");
const Quiz = require("../Models/quiz_model");
const Attempt = require("../Models/attempt_model");

const getQuizes = async (req, res) => {
    try {
        const user = await Student.find({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const quizzes = await Quiz.find();
        res.status(200).json({ quizzes });
    } catch (e){
        console.log(e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

const getQuizById = async (req, res) => {
    try {
        const user = await Student.find({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const quiz = await Quiz.findOne({ _id: req.params.id });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json({ quiz });
    } catch (e){
        console.log(e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

const startQuiz = async (req, res) => {
    try {
        const {quizId, studentId, startedAt} = req.body;
        const attempt = await Attempt.startQuiz(quizId, studentId, startedAt);
        res.status(200).json({attempt});
        
    }catch(e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

const getQuizAndQuestions = async (req, res) => {
    try{
        const {quizId} = req.params;
        const quiz = await Quiz.getPopulatedQuiz(quizId);
        const date = new Date();

        if (quiz.startsAt > date) {
            return res.status(400).json({ message: "Quiz not started yet" });
        }
        else if (quiz.endsAt < date) {
            return res.status(400).json({ message: "Quiz has ended" });
        }

        res.status(200).json({quiz});
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }

}

const submitQuiz = async (req, res) => {
    try {
        const {quizId, studentId, attempt, attemptId} = req.body;
        const _attempt = await Attempt.submitQuiz(quizId, studentId, attemptId, attempt.answers);

        _attempt.populate('quiz');


        res.status(200).json({attempt});
    }catch(e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

const getAttemptById = async (req, res) => {
    try {
        const attempt = await Attempt.findById(req.params.id);
        if (!attempt) {
            return res.status(404).json({ message: "Attempt not found" });
        }
        res.status(200).json({ attempt });
    } catch (e){
        console.log(e);
        res.status(500).json({ message: "Internal server error", error: e.message });
    }
}

module.exports = {
    getQuizes,
    getQuizById,
    startQuiz,
    getQuizAndQuestions,
    submitQuiz,
    getAttemptById
}