import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";

function Quiz() {
  const { state } = useLocation();
  const { numQuestions } = state; // Number of questions user wants to solve
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // Track answers
  const [score, setScore] = useState(0);

  // Shuffle and select questions
  const shuffleQuestions = (questions) => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numQuestions);
  };

  useEffect(() => {
    const selectedQuestions = shuffleQuestions(questionsData);
    setQuestions(selectedQuestions);
  }, [numQuestions]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;
  
    // Prepare the current answer object
    const currentAnswer = {
      question: currentQuestion.question,
      selected: selectedAnswer,
      correct: currentQuestion.correct,
      isCorrect,
    };
  
    // Add the current answer to the answers list
    const updatedAnswers = [...answers, currentAnswer];
    setAnswers(updatedAnswers);
  
    // Update the score if the answer is correct
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  
    // Check if it's the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Delay navigation until answers are updated
      setTimeout(() => {
        navigate("/results", {
          state: {
            score: isCorrect ? score + 1 : score,
            total: numQuestions,
            wrongAnswers: updatedAnswers.filter((answer) => !answer.isCorrect),
          },
        });
      }, 100); // Give time for state update
    }
  };
  

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 to-purple-300 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 shadow-lg">Quiz Time!</h1>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Question {currentQuestionIndex + 1}/{numQuestions}
        </p>
        <p className="text-xl font-medium text-gray-800 mb-4">{currentQuestion.question}</p>
        <div className="flex flex-col space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
