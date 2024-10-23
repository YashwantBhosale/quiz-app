import { useState } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoutes from "./components/ProtectedRoute";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateQuiz from "./pages/Admin/CreateQuiz";

function App() {
	return (
		<>
			<Provider store={store}>
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
				</Routes>
			</Provider>
		</>
	);
}

export default App;
