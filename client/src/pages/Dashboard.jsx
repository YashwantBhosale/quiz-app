import React from "react";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../redux/slices/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import MenuCard from "../components/ui/MenuCard";
import viewQuizIcon from '../assets/images/viewquiz.png';
import scoreIcon from "../assets/images/score.png"

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {user, } = useSelector(selectAuth);

	const handle_logout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_data");
		dispatch(logout());
		navigate("/login");
	};
	return (
		<div className=" pt-[50px] ml-[130px]">
			<h1 className="font-bold text-3xl">Dashboard</h1>
			<p className="text-lg mt-5 italic">Welcome Back, {user ? user.name : "User"}</p>
			<button
				className="absolute top-[50px] right-5 bg-red-500 px-5 py-3 rounded-md font-bold text-white"
				onClick={handle_logout}
			>
				Logout
			</button>

			<div className="flex gap-[60px] flex-wrap">
				<MenuCard imageSrc={viewQuizIcon} buttonText="View Quizzes" buttonLink="/viewstudentquizzes" />
				<MenuCard imageSrc={scoreIcon} buttonText="View Scores" buttonLink="/viewscores" />
			</div>

		</div>
	);
};

export default Dashboard;
