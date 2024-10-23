const express = require('express');
const router = express.Router();
const jwtAuth = require('../middlewares/auth'); 

const {
    getQuizes,
    getQuizById,
    getQuestionById,
} = require('../Controllers/student_controller');

router.use(jwtAuth);
router.get('/quizes', getQuizes);

module.exports = router;