import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Vertical1 from "../ads/vertical1"; // Ad component for the left
import Vertical2 from "../ads/vertical1"; // Ad component for the right

// Sample JSON import or loading mechanism (this could be replaced with an API call or dynamic imports)

import allquestion from "../data/questions.json";
import practicequestion1 from "../data/practicequestion1.json";
import practicequestion2 from "../data/practicequestion2.json";
import practicequestion3 from "../data/practicequestion3.json";

function QuestionForm() {
  const [numQuestions, setNumQuestions] = useState(1);
  const [questionType, setQuestionType] = useState("allquestion"); // Default question type
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Depending on the selected question type, pass the data as state to the quiz page
    let questionData;
    switch (questionType) {
      case "allquestion":
        questionData = allquestion;
        break;
      case "practicequestion1":
        questionData = practicequestion1;
        break;
      case "practicequestion2":
        questionData = practicequestion2;
        break;
      case "practicequestion3":
        questionData = practicequestion3;
        break;
      default:
        questionData = allquestion; // Default to practicequestion1
    }
    
    // Navigate to the quiz page with the selected number of questions and data
    navigate("/quiz", { state: { numQuestions, questionData } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-300">
      {/* Left Ad */}
      <div className="hidden lg:block w-1/5">
        <Vertical1 />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 shadow-lg">
          Welcome to the Quiz App!
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm space-y-6"
        >
          {/* Number of Questions Input */}
          <label className="block text-lg font-medium text-gray-700">
            How many questions do you want to solve?
            <input
              type="number"
              min="1"
              max="500"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="mt-2 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a number of questions you want to solve"
            />
          </label>

          {/* Question Type Selection */}
          <label className="block text-lg font-medium text-gray-700">
            Select question type:
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="mt-2 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="allquestion">All  Questions</option>
              <option value="practicequestion1">Practice Question Set 1 69 questions</option>
              <option value="practicequestion2">Practice Question Set 2 34 questions</option>
              <option value="practicequestion3">Practice Question Set 3 45 questions</option>
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Start Quiz
          </button>
        </form>
      </div>

      {/* Right Ad */}
      <div className="hidden lg:block w-1/5">
        <Vertical2 />
      </div>
    </div>
  );
}

export default QuestionForm;
