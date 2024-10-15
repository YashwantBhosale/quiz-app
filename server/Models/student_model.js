const mongoose = require('mongoose');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

// Student Schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Static functions

/* Function to signup student */
studentSchema.statics.signup = async function (name, rollno, email, phone, password) {
    let student = this.findOne({ email });
    if (student) {
        throw new Error("Student already exists");
    }
    student = new this({ name, rollno, email, phone, password });
    return student.save();
}

/* Function to login student */
studentSchema.statics.login = async function (email, password) {
    let student = await this.findOne({ email: email, password: password });
    if (student) {
        return student;
    }
    return null;
}

/* Function to get student by id */
studentSchema.statics.getStudentById = async function (id) {
    let student = await this.findById(id);
    if (student) {
        return student;
    }
    return null;
}

/* Function to get student by rollno */
studentSchema.statics.getStudentByRollno = async function (rollno) {
    let student = await this.findOne({ rollno: rollno });
    if (student) {
        return student;
    }
    return null;
}

/* Function to get student by email */
studentSchema.statics.getStudentByEmail = async function (email) {
    let student = await this.findOne({ email: email });
    if (student) {
        return student;
    }
    return null;
}

// Model
const Student = mongoose.model('Student', studentSchema);