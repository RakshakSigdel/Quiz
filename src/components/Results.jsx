import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Vertical1 from "../ads/vertical1"; // Left ad
import Vertical2 from "../ads/vertical1"; // Right ad

function Result() {
  const { state } = useLocation();
  const { score, total, wrongAnswers } = state; // Receive the score, total number of questions, and incorrect answers
  const percentage = ((score / total) * 100).toFixed(2); // Calculate percentage
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      {/* Left Advertisement */}
      <div className="hidden lg:block w-1/5">
        <Vertical1 />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Quiz Results</h1>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          {/* Score */}
          <p className="text-lg font-semibold mb-2">
            Your Score: {score} out of {total}
          </p>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            Percentage: {percentage}%
          </p>

          {/* Display Incorrect Answers */}
          {wrongAnswers.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Incorrect Answers</h2>
              <ul className="space-y-4">
                {wrongAnswers.map((item, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p className="font-semibold">{item.question}</p>
                    <p className="text-red-500">Your Answer: {item.selected}</p>
                    <p className="text-green-600">Correct Answer: {item.correct}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-green-600 font-semibold">Great job! You got all answers right.</p>
          )}
        </div>

        {/* Retry Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Try Again
        </button>
      </div>

      {/* Right Advertisement */}
      <div className="hidden lg:block w-1/5">
        <Vertical2 />
      </div>
    </div>
  );
}

export default Result;
