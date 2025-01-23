import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Vertical1 from "../ads/vertical1";
import Vertical2 from "../ads/vertical1";

function QuestionForm() {
  const [numQuestions, setNumQuestions] = useState(1);
  const [subject, setSubject] = useState("questions");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Load the questions for the selected subject
      const questions = await import(`../data/${subject}.json`);
      navigate("/quiz", { state: { numQuestions, questionData: questions.default } });
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-300">
      <div className="hidden lg:block w-1/5">
        <Vertical1 />
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to the Quiz App</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm space-y-6"
        >
          <label className="block text-lg font-medium text-gray-700">
            Select Subject:
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-2 border border-gray-300 p-3 rounded-lg w-full"
            >
              <option value="sem1CHASA">Semester 1 - CHASA</option>
              <option value="sem1programming">Semester 1 - Programming</option>
            </select>
          </label>
          <label className="block text-lg font-medium text-gray-700">
            Number of Questions:
            <input
              type="number"
              min="1"
              max="100"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="mt-2 border border-gray-300 p-3 rounded-lg w-full"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Load Questions
          </button>
        </form>
      </div>
      <div className="hidden lg:block w-1/5">
        <Vertical2 />
      </div>
    </div>
  );
}

export default QuestionForm;
