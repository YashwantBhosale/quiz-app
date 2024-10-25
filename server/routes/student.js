const express = require('express');
const router = express.Router();
const jwtAuth = require('../middlewares/auth'); 

const {
    getQuizes,
    getQuizById,
    getQuestionById,
    startQuiz,
    getQuizAndQuestions
} = require('../Controllers/student_controller');

router.use(jwtAuth);
router.get('/quizes', getQuizes);
router.get('/getquiz/:id', getQuizById);
router.post("/startquiz", startQuiz);
router.get("/getquizandquestions/:quizId", getQuizAndQuestions);


module.exports = router;