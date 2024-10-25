const express = require("express");
const quiz_router = express.Router();
const { adminJwtAuth } = require("../middlewares/adminAuth");
const {
	addQuestion,
	addMultipleQuestions,
	getQuizQuestions,
	getQuizById
} = require("../Controllers/quiz_controller");

quiz_router.use(adminJwtAuth);

quiz_router.get("/getquiz/:quiz_id", getQuizById);
quiz_router.post("/addquestion/:quiz_id", addQuestion);
quiz_router.post("/addmultiplequestions/:quiz_id", addMultipleQuestions);
quiz_router.get("/getquestions/:quiz_id", getQuizQuestions);

module.exports = quiz_router;
