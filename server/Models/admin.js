const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
        },
    ],
});

adminSchema.statics.signup = async function (name, email, phone, password) {
    let admin = await this.findOne({ email: email });
    if (admin) {
        throw new Error("Admin already exists");
    }
    admin = await this.create({ name, email, phone, password });
    return {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        quizzes: admin.quizzes,
    };
};

adminSchema.statics.login = async function (email, password) {
    const admin = await this.findOne({ email });
    if (!admin) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        quizzes: admin.quizzes,
    };
}


module.exports = mongoose.model('Admin', adminSchema);