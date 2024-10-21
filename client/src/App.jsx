import { useState } from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoutes from "./components/ProtectedRoute";

function App() {
	const [count, setCount] = useState(0);

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
				</Routes>
			</Provider>
		</>
	);
}

export default App;
