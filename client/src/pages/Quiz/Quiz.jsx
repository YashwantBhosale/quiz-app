import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/authSlice";

const Quiz = () => {
	const { quizId } = useParams();
	const [quiz, setQuiz] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [timeLeft, setTimeLeft] = useState(null);
	const { token } = useSelector(selectAuth);
	const BASE_URL = "http://localhost:4000";

	const fetchPopulatedQuiz = async () => {
		try {
			const response = await fetch(
				`${BASE_URL}/api/student/getquizandquestions/${quizId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				setQuiz(data.quiz);
				setQuestions(data.quiz.questions);
				initializeTimer(data.quiz.endsAt);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const initializeTimer = (endsAt) => {
		const endTime = new Date(endsAt).getTime();
		const remainingTimeInSeconds = Math.floor((endTime - Date.now()) / 1000);
		setTimeLeft(remainingTimeInSeconds);
	};

	const handleTimeUp = () => {
		console.log("Time's up!");
	};

	useEffect(() => {
		fetchPopulatedQuiz();

		if (sessionStorage.getItem(`quiz_answers_${quizId}`)) {
			console.log("Answers found in session storage");
			let answers = JSON.parse(
				sessionStorage.getItem(`quiz_answers_${quizId}`)
			);
			console.log(answers);
			setSelectedAnswers(answers);
		} else {
			console.log("No answers found in session storage");
		}
	}, []);

	useEffect(() => {
		if (timeLeft === null) return;
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					handleTimeUp();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [timeLeft]);

	const handleAnswerSelect = (questionId, selectedOption) => {
		const newAnswers = {
			...selectedAnswers,
			[questionId]: selectedOption,
		};

		setSelectedAnswers(newAnswers);

		// const answersArray = Object.entries(newAnswers).map(
		// 	([questionId, selectedOption]) => ({
		// 		question_id: questionId,
		// 		selected_option: selectedOption,
		// 	})
		// );

		// sessionStorage.setItem(
		// 	`quiz_answers_${quizId}`,
		// 	JSON.stringify(answersArray)
		// );

        sessionStorage.setItem(`quiz_answers_${quizId}`, JSON.stringify(newAnswers));
    };



	const handleNext = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
		}
	};

	const handleQuizSubmit = () => {
		console.log("Submitting answers:", selectedAnswers);
	};

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;
		return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
			.toString()
			.padStart(2, "0")}`;
	};

	const currentQuestion = questions[currentQuestionIndex];

	if (!quiz || !currentQuestion) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-gray-600">Loading quiz...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-3xl mx-auto px-4">
				<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-xl font-semibold text-gray-800">
							{quiz.title}
						</h1>
						<div
							className={`text-lg font-medium ${
								timeLeft <= 300 ? "text-red-600 animate-pulse" : "text-blue-600"
							}`}
						>
							{formatTime(timeLeft)}
						</div>
					</div>
					<div className="flex justify-between text-sm text-gray-600">
						<span>
							Question {currentQuestionIndex + 1} of {questions.length}
						</span>
						<span>Total Marks: {quiz.total_marks}</span>
					</div>
				</div>
				<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
					<h2 className="text-lg font-medium text-gray-800 mb-4">
						{currentQuestion.title}
					</h2>
					<p className="text-gray-600 mb-6">{currentQuestion.question}</p>
					<div className="space-y-3">
						{currentQuestion.options.map((option, index) => (
							<label
								key={index}
								className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
									selectedAnswers[currentQuestion._id] === option
										? "border-blue-500 bg-blue-50"
										: "border-gray-200 hover:bg-gray-50"
								}`}
							>
								<input
									type="radio"
									name={`question-${currentQuestion._id}`}
									value={option}
									checked={selectedAnswers[currentQuestion._id] === option}
									onChange={() =>
										handleAnswerSelect(currentQuestion._id, option)
									}
									className="w-4 h-4 text-blue-600"
								/>
								<span className="ml-3 text-gray-700">{option}</span>
							</label>
						))}
					</div>
				</div>
				<div className="flex justify-between items-center">
					<button
						onClick={handlePrevious}
						disabled={currentQuestionIndex === 0}
						className={`px-4 py-2 rounded-md font-medium ${
							currentQuestionIndex === 0
								? "bg-gray-100 text-gray-400 cursor-not-allowed"
								: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
						}`}
					>
						Previous
					</button>
					{currentQuestionIndex === questions.length - 1 ? (
						<button
							className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
							onClick={handleQuizSubmit}
						>
							Submit Quiz
						</button>
					) : (
						<button
							onClick={handleNext}
							className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
						>
							Next
						</button>
					)}
				</div>
				<div className="mt-6 bg-white rounded-lg shadow-sm p-4">
					<div className="grid grid-cols-8 gap-2">
						{questions.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentQuestionIndex(index)}
								className={`p-2 text-sm font-medium rounded-md ${
									index === currentQuestionIndex
										? "bg-blue-600 text-white"
										: selectedAnswers[questions[index]._id]
										? "bg-green-100 text-green-800"
										: "bg-gray-100 text-gray-600 hover:bg-gray-200"
								}`}
							>
								{index + 1}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Quiz;
