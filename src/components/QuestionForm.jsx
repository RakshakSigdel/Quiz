import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuestionForm() {
  const [numQuestions, setNumQuestions] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/quiz", { state: { numQuestions } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-300">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 shadow-lg">Welcome to the Quiz App!</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm space-y-6">
        <label className="block text-lg font-medium text-gray-700">
          How many questions do you want to solve?
          <input
            type="number"
            min="1"
            max="500"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="mt-2 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a number between 1 and 500"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
