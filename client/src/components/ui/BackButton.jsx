import React from "react";
import {useNavigate} from "react-router-dom";

const BackButton = () => {
	const navigate = useNavigate();
	return (
		<button
			className="absolute top-[50px] right-10 border-2 border-black px-5 py-3"
			onClick={() => navigate("/admindashboard")}
		>
			Back
		</button>
	);
};

export default BackButton;