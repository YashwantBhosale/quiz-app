const Admin = require('../Models/admin');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Quiz = require('../Models/quiz_model');

dotenv.config();

// Function to signup admin
const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Signup the admin
        const newAdmin = await Admin.signup(name, email, phone, hashedPassword);

        const token = jwt.sign({ _id: newAdmin._id, email: newAdmin.email }, process.env.JWT_ADMIN_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Admin signup successful', admin: newAdmin, token });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
};

// Function to login admin
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.login(email, password);
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ _id: admin._id, email: admin.email }, process.env.JWT_ADMIN_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', admin, token });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
};

const createQuiz = async (req, res) => {
    try {
        const createdBy = req.adminId;
        const { title, subject, description, startsAt, endsAt, duration, total_marks, passing_marks, max_attempts } = req.body;
        
        const newQuiz = await Quiz.createQuiz(title, subject, description, startsAt, endsAt, duration, total_marks, passing_marks, max_attempts, createdBy);
        res.status(200).json({ message: 'Quiz created successfully', quiz: newQuiz });
    }catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
}

const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ createdBy: req.adminId });
        res.status(200).json({ message: 'Quizzes fetched successfully', quizzes });
    }catch(e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
}

module.exports = {
    signup,
    login,
    createQuiz,
    getQuizzes,
};