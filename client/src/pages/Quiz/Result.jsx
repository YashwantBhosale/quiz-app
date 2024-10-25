import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/slices/authSlice";

const Result = () => {
    const { quizId } = useParams();
    const [result, setResult] = useState(null);
    const { token } = useSelector(selectAuth);
    const BASE_URL = "http://localhost:4000";

    const fetchResult = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/student/getresult/${quizId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setResult(data.result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchResult();
    }, []);

    if (!result) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-600">Loading result...</div>
            </div>
        );
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-semibold text-gray-800">Quiz Result</h1>
                        <div className="text-lg font-medium text-blue-600">
                            Score: {result.score} / {result.max_score}
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Time Taken: {formatTime(result.time_taken)}</span>
                        <span>Completed: {result.completed ? "Yes" : "No"}</span>
                    </div>
                </div>
                {result.answers?.map((answer, index) => (
                    <div key={answer.question._id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-medium text-gray-800 mb-4">
                            {index + 1}. {answer.question.title}
                        </h2>
                        <p className="text-gray-600 mb-6">{answer.question.question}</p>
                        <div className="space-y-3">
                            {answer.question.options.map((option, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-lg border ${
                                        i === answer.correct_option
                                            ? "border-green-500 bg-green-50"
                                            : i === answer.selected_option
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <span className="text-gray-700">{option}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Result;
