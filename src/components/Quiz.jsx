import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Vertical1 from "../ads/vertical1";
import Vertical2 from "../ads/vertical1";

function Quiz() {
  const { state } = useLocation();
  const { numQuestions, questionData } = state;
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Shuffle the array to get random questions
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionData);
    setQuestions(shuffledQuestions.slice(0, numQuestions));
  }, [numQuestions, questionData]);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const currentQuestion = questions[currentQuestionIndex];
    if (option === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const finishQuiz = () => {
    setQuizFinished(true);
  };

  const playAgain = () => {
    // Navigate back to the question form page
    navigate("/");
  };

  const currentQuestion = questions[currentQuestionIndex];
  const percentage = ((score / questions.length) * 100).toFixed(2);

  // Check if the quiz is finished (when we reach the end of the questions)
  if (currentQuestionIndex >= numQuestions && !quizFinished) {
    finishQuiz();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="hidden lg:block w-1/5">
        <Vertical1 />
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5">
        <h1 className="text-4xl font-extrabold mb-6">
          {quizFinished ? "Quiz Finished!" : "Quiz"}
        </h1>

        {quizFinished ? (
          // Display the score and percentage when the quiz is finished
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
            <p className="mb-4 text-lg font-semibold">
              Quiz Completed! Here's your result:
            </p>
            <p className="text-xl">
              You got {score} out of {questions.length} correct!
            </p>
            <p className="text-xl font-semibold">Your Score: {percentage}%</p>
            <button
              onClick={playAgain}
              className="mt-4 bg-green-600 px-6 py-3 rounded-lg text-white hover:bg-green-700"
            >
              Play Again
            </button>
          </div>
        ) : (
          // Display the question if the quiz isn't finished
          currentQuestion && (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
              <p className="mb-4 text-lg font-semibold">
                Question {currentQuestionIndex + 1}/{questions.length}
              </p>
              <p className="mb-6">{currentQuestion.question}</p>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`px-4 py-2 rounded-lg w-full ${
                      selectedAnswer
                        ? option === currentQuestion.correct
                          ? "bg-green-500"
                          : option === selectedAnswer
                          ? "bg-red-500"
                          : "bg-gray-200"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                    disabled={!!selectedAnswer}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={finishQuiz}
                  className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700"
                >
                  End Quiz
                </button>
                <button
                  onClick={nextQuestion}
                  className={`px-4 py-2 rounded-lg text-white ${
                    selectedAnswer
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!selectedAnswer}
                >
                  Next
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <div className="hidden lg:block w-1/5">
        <Vertical2 />
      </div>
    </div>
  );
}

export default Quiz;
