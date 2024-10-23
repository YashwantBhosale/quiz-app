import React from "react";
import { selectAuth } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import ideaIcon from "../../assets/images/idea.png";
import listIcon from "../../assets/images/list.png";


const AdminDashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated, user: admin } = useSelector(selectAuth);

	if (!isAuthenticated) {
		return <Navigate to="/adminlogin" />;
	}

	const handle_logout = () => {
		sessionStorage.removeItem("token");
		dispatch(logout());
		navigate("/adminlogin");
	};

	return (
		<div className=" mt-[50px] ml-[30px]">
			<h1 className="font-bold text-3xl">Admin Dashboard</h1>
            <p className="text-lg mt-5 italic">Welcome Back, {admin ? admin.name : "Admin"}</p>
			<button
				className="absolute top-[50px] right-5 bg-red-500 px-5 py-3 rounded-md font-bold text-white"
				onClick={handle_logout}
			>
				LOGOUT
			</button>

			<div className="flex gap-[60px] flex-wrap">
				<div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[30%] max-w-[300px] mt-[100px] rounded-xl pt-[25px] overflow-hidden">
					<img
						src={ideaIcon}
						alt="idea"
						className="w-[150px] h-[150px] mx-auto block my-[30px]"
					/>
					<button onClick={e => navigate('/createquiz')} className="text-xl bg-green-500 text-white text-center px-5 py-5 mt-[20px] w-full">
						Create Quiz &#8594;
					</button>
				</div>

				<div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[30%] max-w-[300px] mt-[100px] rounded-xl pt-[25px] overflow-hidden">
					<img
						src={listIcon}
						alt="idea"
						className="w-[150px] h-[150px] mx-auto block my-[30px]"
					/>
					<button className="text-xl bg-green-500 text-white text-center px-5 py-5 mt-[20px] w-full">
						View Students List &#8594;
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
