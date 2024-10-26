const express = require("express");
const auth_router = express.Router();
const main_router = express.Router();
const { adminSignupAuth, adminJwtAuth } = require("../middlewares/adminAuth");
const {
	login,
	signup,
	createQuiz,
	getQuizzes
} = require("../Controllers/admin_controller");

auth_router.post("/login", login);
auth_router.post("/signup", adminSignupAuth, signup);

main_router.use(adminJwtAuth);

main_router.post("/createquiz", createQuiz);
main_router.get("/quizzes", getQuizzes);

module.exports = {
	adminAuthRouter: auth_router,
	adminMainRouter: main_router,
};
