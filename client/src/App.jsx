import { useState } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import ProtectedRoutes from "./components/ProtectedRoute";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateQuiz from "./pages/Admin/CreateQuiz";
import ViewQuizzes from "./pages/Admin/ViewQuizzes";
import ViewStudentQuizzes from "./pages/Quiz/ViewQuizzes";
import { loginSuccess, logout } from "./redux/slices/authSlice";
import ViewStudentQuiz from "./pages/Quiz/ViewQuiz";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Quiz/Result";

function App() {
	let data = sessionStorage.getItem("user_data");
	const dispatch = useDispatch();

	if (data) {
		data = JSON.parse(data);

		dispatch(
			loginSuccess({
				user: data.user,
				token: data.token,
				role: data.role,
				isAuthenticated: true,
				loading: false,
				error: null,
			})
		);
	} else {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_data");
		dispatch(logout());
	}
	return (
		<div className="bg-gray-100 min-h-[100vh]">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				<Route
					path="/dashboard"
					element={
						<ProtectedRoutes role="user">
							<Dashboard />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/viewstudentquizzes"
					element={
						<ProtectedRoutes role="user">
							<ViewStudentQuizzes />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/viewstudentquiz/:quizId"
					element={
						<ProtectedRoutes role="user">
							<ViewStudentQuiz />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/quiz/:quizId"
					element={
						<ProtectedRoutes role="user">
							<Quiz />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/result/:quizId"
					element={
						<ProtectedRoutes role="user">
							<Result />
						</ProtectedRoutes>
					}
				/>

				<Route path="/adminlogin" element={<AdminLogin />} />

				<Route
					path="/admindashboard"
					element={
						<ProtectedRoutes role="admin">
							<AdminDashboard />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/createquiz"
					element={
						<ProtectedRoutes role="admin">
							<CreateQuiz />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/viewquizzes"
					element={
						<ProtectedRoutes role="admin">
							<ViewQuizzes />
						</ProtectedRoutes>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
