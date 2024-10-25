import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/authSlice";

const Quiz = () => {
    const {quizId} = useParams();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const { token } = useSelector(selectAuth);


    const fetchPopulatedQuiz = async () => {
		console.log(token);
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
				console.log(data);
			}
		} catch (error) {
			console.error(error);
		}
	};



    

    return <div>Quiz</div>;
};

export default Quiz;
