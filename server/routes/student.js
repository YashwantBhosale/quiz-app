const express = require("express");
const router = express.Router();
const jwtAuth = require("../middlewares/auth");

const {
	getQuizes,
	getQuizById,
	getQuestionById,
	startQuiz,
	getQuizAndQuestions,
	submitQuiz,
	getResult,
} = require("../Controllers/student_controller");

router.use(jwtAuth);
router.get("/quizes", getQuizes);
router.get("/getquiz/:id", getQuizById);
router.post("/startquiz", startQuiz);
router.get("/getquizandquestions/:quizId", getQuizAndQuestions);
router.post("/submitquiz", submitQuiz);
router.get("/getresult/:attemptId", getResult);

module.exports = router;
