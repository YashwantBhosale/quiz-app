const mongoose = require("mongoose");
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");

// Student Schema
const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	rollno: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	quizes_taken: [
		{
			quiz_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Quiz",
			},
			attempts: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Attempt",
				},
			],
			score: {
				type: Number,
			},
		},
	],
});

// Static functions
/* Function to signup student */
studentSchema.statics.signup = async function (
	name,
	rollno,
	email,
	phone,
	password
) {
	let student = await this.findOne({ email: email });
	if (student) {
		throw new Error("Student already exists");
	}
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	student = await this.create({
		name,
		rollno,
		email,
		phone,
		password: hashedPassword,
	});

	return {
		_id: student._id,
		name: student.name,
		rollno: student.rollno,
		email: student.email,
		phone: student.phone,
		quizes_taken: student.quizes_taken,
	};
};

/* Function to login student */
studentSchema.statics.login = async function (email, password) {
	let student = await this.findOne({ email: email });
	if (!student) {
		return null;
	}
	const isValid = await bcrypt.compare(password, student.password);
	if (!isValid) {
		return null;
	}
	return {
		_id: student._id,
		name: student.name,
		rollno: student.rollno,
		email: student.email,
		phone: student.phone,
		quizes_taken: student.quizes_taken,
	};
};

/* Function to get student by id */
studentSchema.statics.getStudentById = async function (id) {
	let student = await this.findById(id);
	if (student) {
		return student;
	}
	return null;
};

/* Function to get student by rollno */
studentSchema.statics.getStudentByRollno = async function (rollno) {
	let student = await this.findOne({ rollno: rollno });
	if (student) {
		return student;
	}
	return null;
};

/* Function to get student by email */
studentSchema.statics.getStudentByEmail = async function (email) {
	let student = await this.findOne({ email: email });
	if (student) {
		return student;
	}
	return null;
};

// Model
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
