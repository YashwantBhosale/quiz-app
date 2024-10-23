const Student = require("../Models/student_model");
const Quiz = require("../Models/quiz_model");

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

module.exports = {
    getQuizes,
    getQuizById,
}