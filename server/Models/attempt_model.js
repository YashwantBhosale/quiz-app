// Model to record attempts made by users to solve the quiz
// instance of this model will be created when a user starts a quiz
// and will be updated as the user progresses through the quiz


const mongoose = require('mongoose');
const Quiz = require('./quiz_model');
const Student = require('./student_model');
const Question = require('./question_model');

const attemptSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    answers: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            selected_option: {
                type: Number,
            }, 
            correct_option: {
                type: Number,
            }
        }
    ],
    score: {
        type: Number,
    },
    max_score: {
        type: Number,
    },
    startedAt: {
        type:Date,
        required: true
    },
    endedAt: {
        type: Date
    },
    time_taken: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

attemptSchema.statics.startQuiz = async function (quizId, studentId, startedAt) {
    const quiz = await Quiz.findById(quizId);
    const student = await Student.findById(studentId);
    if (!quiz || !student) {
        throw new Error('Quiz or Student not found');
    }

    const student_attempts = await this.find({ quiz: quizId, student: studentId });
    if (student_attempts.length >= quiz.max_attempts) {
        throw new Error('You have already attempted this quiz');
    }

    const attempt = new this({
        quiz: quizId,
        student: studentId,
        startedAt
    });
    await attempt.save();
    
    quiz.attempts?.push(attempt._id);
    
    const existingQuiz = student.quizes_taken.find(q => q.quiz_id.toString() === quizId.toString());
    if (existingQuiz) {
        existingQuiz.attempts.push(attempt._id);
    } else {
        student.quizes_taken.push({
            quiz_id: quizId,
            attempts: [attempt._id]
        });
    }

    await quiz.save();
    await student.save();
    return attempt;
}

attemptSchema.statics.submitQuiz = async function (attemptId, answers, endedAt) {
    const attempt = await this.findById(attemptId);
    if (!attempt) {
        throw new Error('Attempt not found');
    }

    attempt.answers = answers;
    attempt.endedAt = endedAt;
    attempt.time_taken = (endedAt - attempt.startedAt) / 1000;
    attempt.score = 0;
    attempt.max_score = 0;

    const quiz = await Quiz.findById(attempt.quiz);
    for (let i = 0; i < answers.length; i++) {
        const question = await Question.findById(answers[i].question);
        if (!question) {
            throw new Error('Question not found');
        }
        if (answers[i].selected_option === question.correct_option) {
            attempt.score += question.marks;
        }
        attempt.max_score += question.marks;
    }

    await attempt.save();
    
    quiz.attempts?.push(attempt._id);
    await quiz.save();


    return attempt;
}

const Attempt = mongoose.model('Attempt', attemptSchema);
module.exports = Attempt;