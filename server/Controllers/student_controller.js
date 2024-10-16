const Student = require("../Models/student_model");
const { sendEmail } = require("../lib/sendEmail");
const dotenv = require("dotenv");
const OTP = require("../Models/otp_model");

dotenv.config();

/* 
    OTP verification and signup:
    1. When user will click signup button, api call will be made on generateOTP route.
    2. OTP will be generated and hashed to store in the db. Otp will be sent to the user's email. During this user will wait for confirmation of successful OTP generation.
    3. upon successful OTP generation, user will enter the OTP and click on verify OTP button.
    4. api call will be made on verifyOTP route.
    5. OTP will be verified and user will be signed up.
*/

// Function to generate OTP
const generateOTP = async (req, res) => {
	try {
		const { email, purpose } = req.body;
		let student = await Student.getStudentByEmail(email);
		if (student) {
			return res.status(400).json({ message: "Student already exists" });
		}

		// Generate OTP
		const otp = await OTP.generateOTP(email, purpose);

		// Send email
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

// Function to verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp, purpose } = req.body;
        const isValid = await OTP.verifyOTP(email, otp, purpose);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        res.status(200).json({ message: "OTP verified" });
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ message: "Internal server error", error: e.message });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.login(email, password);
        if (!student) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", student });
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ message: "Internal server error", error: e.message });
    }
};

// Signup function
const signup = async (req, res) => {
    try {
        const { name, rollno, email, phone, password } = req.body;
        const student = await Student.signup(name, rollno, email, phone, password);
        res.status(200).json({ message: "Signup successful", student });
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
    signup
}
