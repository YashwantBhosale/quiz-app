import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupWindow from "../components/SignupWindow";
import OTPwindow from "../components/OTPwindow";
import { useSelector, useDispatch } from "react-redux";
import { loginRequest, loginSuccess, selectAuth } from "../redux/slices/authSlice";

const BASE_URL = "http://localhost:4000";

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		purpose: "signup",
	});
	const dispatch = useDispatch();
	const [step, setStep] = useState(1);
	const [otp, setOtp] = useState("");
	const [confirm_password, setConfirm_password] = useState("");
	const handleChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSignup = async (e) => {
		try {
			if (formData.password != confirm_password) {
				alert("Passwords do not match");
				return;
			}

			e.preventDefault();
			const response = await fetch(`${BASE_URL}/api/user/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (response.ok) {
				setStep(2);
			} else {
				const error = await response.json();
				alert(error.message);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handle_otp = async (e) => {
		try {
			e.preventDefault();
			dispatch(loginRequest());
			const response = await fetch(`${BASE_URL}/api/user/verifyotp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: "test user",
					rollno: "1235",
					email: formData.email,
					phone: "12345678",
					password: formData.password,
					otp: otp,
					purpose: "signup",
				}),
			});
			if (response.ok) {
				const data = await response.json();
				sessionStorage.setItem("token", data.token);
				
				dispatch(loginSuccess({
					user: data.student,
					token: data.token,
					role: "user",
					isAuthenticated: true,
					loading: false,
					error: null,
				}));
 				navigate("/dashboard");
			} else {
				const error = await response.json();
				alert(error.message);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900 min-h-[100vh]">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-h-[100vh]">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					{step == 1 && (
						<SignupWindow
							formData={formData}
							handleChange={handleChange}
							handleSignup={handleSignup}
							confirm_password={confirm_password}
							setConfirm_password={setConfirm_password}
						/>
					)}
					{step == 2 && (
						<OTPwindow OTP={otp} setOTP={setOtp} handleOtp={handle_otp} />
					)}
				</div>
			</div>
		</section>
	);
};

export default Signup;
