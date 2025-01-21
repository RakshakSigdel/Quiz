import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Vertical1 from "../ads/vertical1"; // Ad component for the left
import Vertical2 from "../ads/vertical1"; // Ad component for the right

import allQuestions from "../data/questions.json"; // Import all questions

function QuestionForm() {
  const [numQuestions, setNumQuestions] = useState(1);
  const [questionType, setQuestionType] = useState("all"); // Default question type
  const navigate = useNavigate();

  // Define ID ranges for each practice set
  const idRanges = {
    all: [1, 300], // All questions (1-300)
    practiceSet1: [1, 69], // Practice Set 1 (1-100)
    practiceSet2: [70, 103], // Practice Set 2 (101-200)
    practiceSet3: [104, 148], // Practice Set 3 (201-300)
  };

  // Function to filter questions by ID range
  const filterQuestionsByIdRange = (range) => {
    return allQuestions.filter(
      (question) => question.id >= range[0] && question.id <= range[1]
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine the question data based on the selected type
    let questionData;
    if (questionType === "all") {
      questionData = allQuestions; // All questions
    } else {
      const range = idRanges[questionType];
      questionData = filterQuestionsByIdRange(range);
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
              onChange={(e) => setNumQuestions(Number(e.target.value))}
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
              <option value="all">All Questions (1-300)</option>
              <option value="practiceSet1">Practice Question Set 1</option>
              <option value="practiceSet2">Practice Question Set 2</option>
              <option value="practiceSet3">Practice Question Set 3</option>
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
