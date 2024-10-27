const Student = require("../Models/student_model");
const { sendEmail } = require("../lib/sendEmail");
const dotenv = require("dotenv");
const OTP = require("../Models/otp_model");
const Quiz = require("../Models/quiz_model");
const jwt = require("jsonwebtoken");

dotenv.config();

/* 
    OTP verification and signup:
    1. When user will click signup button, api call will be made on generateOTP route.
    2. OTP will be generated and hashed to store in the db. Otp will be sent to the user's email. During this user will wait for confirmation of successful OTP generation.
    3. upon successful OTP generation, user will enter the OTP and click on verify OTP button.
    4. api call will be made on verifyOTP route.
    5. OTP will be verified and user will be signed up.
*/

const generateOTP = async (req, res) => {
	try {
		const { email, purpose } = req.body;
		let student = await Student.getStudentByEmail(email);
		if (student) {
			return res.status(400).json({ message: "Student already exists" });
		}

		const otp = await OTP.generateOTP(email, purpose);

		const subject = "Quiz App OTP";
		const text = `Your OTP is ${otp}`;
		await sendEmail(email, subject, text);

		res.status(200).json({ message: "OTP generated" });
	} catch (e) {
		console.log(e);
		res
			.status(500)
			.json({ message: "Internal server error", error: e.message });
	}
};

const verifyOTP = async (req, res) => {
    try {
        const { name, rollno, email, phone, password, otp, purpose } = req.body;

        const isValid = await OTP.verifyOTP(email, otp, purpose);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const newStudent = await Student.signup(name, rollno, email, phone, password);

        const token = jwt.sign({ email: newStudent.email }, process.env.JWT_SECRET, {
            expiresIn: "6h",
        });        

        res.status(200).json({ message: "OTP verified and signup successful", student: newStudent, token });
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ message: "Internal server error", error: e.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.login(email, password);
        if (!student) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: student._id, email: student.email }, process.env.JWT_SECRET, {
            expiresIn: "6h",
        });

        res.status(200).json({ message: "Login successful", student, token });
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ message: "Internal server error", error: e.message });
    }
};

module.exports = {
    generateOTP,
    verifyOTP,
    login,
    // signup
}
