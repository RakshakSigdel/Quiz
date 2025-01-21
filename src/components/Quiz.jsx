import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Vertical1 from "../ads/vertical1"; // Left ad
import Vertical2 from "../ads/vertical1"; // Right ad

function Quiz() {
  const { state } = useLocation();
  const { numQuestions, questionData } = state; // Receive filtered data
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]); // Track incorrect answers
  const [isQuizFinished, setIsQuizFinished] = useState(false); // Track quiz completion

  // Shuffle and select questions
  useEffect(() => {
    const shuffleQuestions = (questions) => {
      const shuffled = [...questions];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, numQuestions);
    };

    const shuffledQuestions = shuffleQuestions(questionData);
    setQuestions(shuffledQuestions);
  }, [numQuestions, questionData]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    // If the answer is correct, increase the score
    if (selectedAnswer === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    } else {
      // Record incorrect answer
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          selected: selectedAnswer,
          correct: currentQuestion.correct,
        },
      ]);
    }

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Set quiz as finished
      setIsQuizFinished(true);
    }
  };

  useEffect(() => {
    if (isQuizFinished) {
      // Delay the navigation to ensure state updates have completed
      setTimeout(() => {
        navigate("/results", {
          state: { score, total: questions.length, wrongAnswers },
        });
      }, 500); // Wait for 500ms to ensure state is fully updated
    }
  }, [isQuizFinished, score, wrongAnswers, navigate, questions.length]);

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      {/* Left Advertisement */}
      <div className="hidden lg:block w-1/5">
        <Vertical1 />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Quiz Time!</h1>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <p className="text-lg font-semibold mb-2">
            Question {currentQuestionIndex + 1}/{questions.length}
          </p>
          <p className="text-xl mb-4">{currentQuestion.question}</p>

          {/* Options Buttons */}
          <div className="flex flex-col space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Advertisement */}
      <div className="hidden lg:block w-1/5">
        <Vertical2 />
      </div>
    </div>
  );
}

export default Quiz;
