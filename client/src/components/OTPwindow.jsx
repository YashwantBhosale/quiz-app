import React, { useEffect, useState } from "react";

const OTPwindow = ({ OTP, setOTP, handleOtp }) => {
	const [otp, setOtp] = useState(["", "", "", ""]);

	const handleChange = (e, index) => {
		const value = e.target.value;
		if (/^[0-9]$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);
			if (index < 3) {
				document.getElementById(`otp-input-${index + 1}`).focus();
			}
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace") {
			if (otp[index] === "" && index > 0) {
				document.getElementById(`otp-input-${index - 1}`).focus();
				const newOtp = [...otp];
				newOtp[index - 1] = "";
				setOtp(newOtp);
			} else {
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
			}
		}
	};

	const otpString = otp.join("");
	useEffect(() => {
		setOTP(otpString);
	}, [otp, setOTP, otpString]);

	return (
		<div className="p-6 space-y-4 md:space-y-6 sm:p-8 min-h-[300px]">
			<h2 className="text-white">Enter OTP</h2>
			<div className="flex flex-col space-y-16">
				<div className="flex flex-row gap-3 items-center justify-between mx-auto w-full max-w-xs">
					<div className="w-16 h-16 ">
						<input
							className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
							type="text"
							name=""
							value={otp[0]}
							onChange={(e) => handleChange(e, 0)}
							onKeyDown={(e) => handleKeyDown(e, 0)}
							id="otp-input-0"
						/>
					</div>
					<div className="w-16 h-16 ">
						<input
							className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
							type="text"
							name=""
							value={otp[1]}
							onChange={(e) => handleChange(e, 1)}
							onKeyDown={(e) => handleKeyDown(e, 1)}
							id="otp-input-1"
						/>
					</div>
					<div className="w-16 h-16 ">
						<input
							className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
							type="text"
							name=""
							value={otp[2]}
							onChange={(e) => handleChange(e, 2)}
							onKeyDown={(e) => handleKeyDown(e, 2)}
							id="otp-input-2"
						/>
					</div>
					<div className="w-16 h-16 ">
						<input
							className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
							type="text"
							name=""
							value={otp[3]}
							onChange={(e) => handleChange(e, 3)}
							onKeyDown={(e) => handleKeyDown(e, 3)}
							id="otp-input-3"
						/>
					</div>
				</div>
				<div className="flex flex-row gap-3 items-center justify-between mx-auto w-full max-w-xs">
						<button
							type="submit"
							className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							onClick={handleOtp}
						>
							Proceed
						</button>
				</div>
			</div>
		</div>
	);
};

export default OTPwindow;
