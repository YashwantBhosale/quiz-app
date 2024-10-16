const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async (email, subject, content) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL,
			pass: process.env.GMAIL_PASS,
		},
	});

	const mail_options = {
		from: process.env.GMAIL,
		to: email,
		subject: subject,
		text: content,
	};

	transporter.sendMail(mail_options, (err, data) => {
		if (err) {
			console.log(err);
		}
	});
};

module.exports = { sendEmail };
