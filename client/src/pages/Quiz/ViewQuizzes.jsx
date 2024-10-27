import React, { useEffect, useState } from "react";
import quizBannerIcon from "../../assets/images/quizbannericon.png";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";

const ViewStudentQuizzes = () => {
	const navigate = useNavigate();
	const [loading, setloading] = useState(false);
	const [quizzes, setQuizzes] = useState([]);

	const fetchQuizzes = async () => {
		try {
			setloading(true);
			const response = await fetch("http://localhost:4000/api/student/quizes", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			});
			const data = await response.json();
			setQuizzes(data.quizzes);
			console.log(data);
		} catch (e) {
			console.log(e);
			alert(e.message);
		} finally {
			setloading(false);
		}
	};
	useEffect(() => {
		fetchQuizzes();
	}, []);

	function ISOtoDate(isoString) {
		const date = new Date(isoString);
		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	}

	return (
		<div className=" pt-[50px] pb-[50px] ml-[150px]">
			<BackButton path={"/dashboard"} />
			<h1 className="font-bold text-3xl">Quizzes</h1>
			{quizzes &&
				quizzes.map((quiz) => {
					let date = new Date();
					const hasEnded = date > new Date(quiz.endsAt);
					return (
						<div
							key={quiz._id}
							className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] m-10 ml-0 p-7 flex gap-[25px] relative items-center rounded-lg "
						>
							<img
								src={quizBannerIcon}
								alt="quiz banner icon"
								className="h-full max-h-[250px] w-auto object-contain shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-3"
							/>
							<div>
								<h2 className="font-bold text-4xl">{quiz.title}</h2>
								<p className="mt-3">
									<b>Subject:</b> {quiz.subject}
								</p>
								<p className="text-gray-500">{quiz.description}</p>
								<p className="mt-5">
									<b>Starts: </b>
									{ISOtoDate(quiz.startsAt)}
								</p>
								{/* <p>{ISOtoDate(quiz.endsAt)}</p> */}
								<p>
									<b>Duration: </b>
									{quiz.duration} Minutes
								</p>
								<div className="flex gap-5">
									<p>
										<b>Total Marks: </b>
										{quiz.total_marks}
									</p>
									<p>
										<b>Passing Marks: </b>
										{quiz.passing_marks}
									</p>
								</div>
								<p className="absolute bottom-5 right-5 text-green-600 font-bold">
									{quiz.max_attempts} attempts
								</p>
								{hasEnded && <p className="text-red-500">The Quiz Has Ended !</p>}
								<button
									type="button"
									className={`text-white ${
										hasEnded
											? "bg-gray-700"
											: "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
									}  font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none mt-3`}
									onClick={
										hasEnded
											? () => alert("QUIZ HAS ENDED!")
											: () => navigate("/viewstudentquiz/" + quiz._id)
									}
									disabled={hasEnded}
								>
									Attempt Quiz
								</button>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default ViewStudentQuizzes;
