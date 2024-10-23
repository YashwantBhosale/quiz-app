import React, { useState, useEffect } from "react";
import BackButton from "../../components/ui/BackButton";
import quizBannerIcon from "../../assets/images/quizbannericon.png";

const BASE_URL = "http://localhost:4000";

const ViewQuizzes = () => {
	const [quizzes, setQuizzes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				const response = await fetch(`${BASE_URL}/api/admin/quizzes`, {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					},
				});
				if (response.ok) {
					const data = await response.json();
					setQuizzes(data.quizzes);
				} else {
					const error = await response.json();
					alert(error.message);
				}
			} catch (e) {
				console.log(e);
				alert("An error occurred. Please try again later.");
			}
			setLoading(false);
		};

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
		<div className=" mt-[50px] ml-[30px]">
			<h1 className="font-bold text-3xl">View Quizzes</h1>
			<BackButton />
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					{quizzes.map((quiz) => (
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
									<p><b>Total Marks: </b>{quiz.total_marks}</p>
									<p><b>Passing Marks: </b>{quiz.passing_marks}</p>
								</div>
								<p className="absolute bottom-5 right-5 text-green-600 font-bold">
									{quiz.max_attempts} attempts
								</p>
								<button
									type="button"
									class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none mt-3"
								>
									View Quiz
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ViewQuizzes;
