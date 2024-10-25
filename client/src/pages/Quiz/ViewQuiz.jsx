import React, { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/authSlice";
import BackButton from "../../components/ui/BackButton";

const BASE_URL = "http://localhost:4000";

const ViewQuiz = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	// const quizId = searchParams.get("quizId");
	const { token } = useSelector(selectAuth);
	const { quizId } = useParams();
	const [quiz, setQuiz] = useState(null);

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

	const fetchQuiz = async () => {
		console.log(token);
		try {
			const response = await fetch(
				`${BASE_URL}/api/student/getquiz/${quizId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				setQuiz(data.quiz);
				console.log(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchQuiz();
	}, []);

	const rules = [
		"You must complete the quiz within the allocated time",
		"Each question must be answered in sequence",
		"You cannot go back to previous questions",
		"Ensure stable internet connection during the quiz",
		"Do not refresh or close the browser window",
		"Multiple tabs or windows are not allowed",
	];

	return (
		<div className=" pt-[50px] w-[85%] mx-auto">
            <BackButton path={"/viewstudentquizzes"} />
			<h1 className="font-bold text-3xl">View Quiz</h1>`
			{quiz && (
				<div className="space-y-6 p-6 bg-white rounded-lg shadow-sm mr-10">
					<h2 className="font-bold text-3xl text-gray-900">{quiz.title}</h2>

					<p className="text-gray-600 text-lg">{quiz.description}</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="grid gap-2 text-sm text-gray-600">
							<div className="flex items-center">
								<span className="font-medium w-24">Duration:</span>
								<span>{quiz.duration} minutes</span>
							</div>

							<div className="flex items-center">
								<span className="font-medium w-24">Start Time:</span>
								<span>{ISOtoDate(quiz.startsAt)}</span>
							</div>

							<div className="flex items-center">
								<span className="font-medium w-24">End Time:</span>
								<span>{ISOtoDate(quiz.endsAt)}</span>
							</div>

							<div className="flex items-center">
								<span className="font-medium w-24">Created At:</span>
								<span>{ISOtoDate(quiz.createdAt)}</span>
							</div>
						</div>

						<div className="bg-blue-50 rounded-md p-4">
							<h3 className="font-semibold text-lg text-gray-900 mb-3">
								Quiz Information
							</h3>
							<div className="space-y-2 text-sm">
								<div className="flex items-center text-gray-600">
									<span className="font-medium w-32">Total Questions:</span>
									<span>{quiz.questions?.length || 0}</span>
								</div>
								<div className="flex items-center text-gray-600">
									<span className="font-medium w-32">Maximum Marks:</span>
									<span>{quiz.total_marks || 100}</span>
								</div>
								<div className="flex items-center text-gray-600">
									<span className="font-medium w-32">Passing Marks:</span>
									<span>{quiz.passing_marks || 40}</span>
								</div>
								<div className="flex items-center text-gray-600">
									<span className="font-medium w-32">Attempts Left:</span>
									<span>
                                        {/* Pending */}
										{quiz.max_attempts}{" "} 
										{quiz.max_attempts === 1 ? "attempt" : "attempts"}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray-50 rounded-md p-4">
						<h3 className="font-semibold text-lg text-gray-900 mb-3">
							Quiz Rules
						</h3>
						<ul className="space-y-2">
							{rules.map((rule, index) => (
								<li key={index} className="flex items-start text-gray-600">
									<span className="mr-2 text-blue-600">•</span>
									{rule}
								</li>
							))}
						</ul>
					</div>

					<div className="pt-4 border-t border-gray-200 flex items-center justify-end">
						<button
							onClick={() => navigate('/quiz/' + quizId)}
							className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Start Quiz
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewQuiz;