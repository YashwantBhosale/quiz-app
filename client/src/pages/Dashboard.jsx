import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handle_logout = () => {
		sessionStorage.removeItem("token");
		dispatch(logout());
		navigate("/login");
	};
	return (
		<div>
			Dashboard
			<button className="absolute top-5 right-5 bg-red-500 px-5 py-3 rounded-md" onClick={handle_logout}>Logout</button>
		</div>
	);
};

export default Dashboard;
