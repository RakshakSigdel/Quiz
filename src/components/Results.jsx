import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Vertical1 from "../ads/vertical1"; // Left ad
import Vertical2 from "../ads/vertical1"; // Right ad

function Results() {
  const { state } = useLocation();
  const { score, total, wrongAnswers } = state;
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-blue-300">
      {/* Left Ad */}
      <div className="hidden lg:block w-1/5">
        <Vertical1 />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 shadow-lg">Quiz Results</h1>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Your Score: <span className="text-2xl font-bold text-blue-600">{score}/{total}</span> ({((score / total) * 100).toFixed(2)}%)
          </p>
          {wrongAnswers.length > 0 ? (
            <>
              <h2 className="text-xl font-bold text-red-600 mb-4">Incorrect Answers:</h2>
              <ul className="list-disc list-inside">
                {wrongAnswers.map((answer, index) => (
                  <li key={index} className="mb-4">
                    <p className="font-medium">Q: {answer.question}</p>
                    <p className="text-red-500">Your Answer: <span className="font-semibold">{answer.selected}</span></p>
                    <p className="text-green-500">Correct Answer: <span className="font-semibold">{answer.correct}</span></p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-green-500 font-medium text-lg">All answers are correct! 🎉</p>
          )}
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Restart Quiz
          </button>
        </div>
      </div>

      {/* Right Ad */}
      <div className="hidden lg:block w-1/5">
        <Vertical2 />
      </div>
    </div>
  );
}

export default Results;
