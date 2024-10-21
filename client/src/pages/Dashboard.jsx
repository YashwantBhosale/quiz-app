import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();
	const handle_logout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<div>
			Dashboard
			<button onClick={handle_logout}>Logout</button>
		</div>
	);
};

export default Dashboard;
