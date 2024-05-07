import React, { useState } from "react";
import "./quiz.css";
import questions from "./Data";
import Navbar from "../Components/Navbar";

function Quiz() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const optionClicked = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = option;
    setSelectedOptions(updatedOptions);

    if (option.isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const submitClicked = () => {
    setFinalResults(true);
  };

  //restartQuiz
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
    setSelectedOptions([]);
  };

  // Get unique topics
  const uniqueTopics = Array.from(new Set(questions.map(q => q.topic))).slice(0, 5);

  return (
    <>
      <Navbar />
      <div className="head">
        <h2>APTITUDE CORNER</h2>
      </div>
      <div className="container mx-auto flex">
        <div className="w-3/4">
          {showFinalResults ? (
            <div className="final-results">
              
              <h2> You have successfully submitted the assignment </h2>
              <p>
                {" "}
                <b>Question asked :</b> {questions.length}
              </p>
              <p>
                {" "}
                <b>Question correct :</b> {score}
              </p>
              <p>
                {" "}
                <b>Your Score : </b>
                {(score / questions.length).toFixed(2) * 100} %
              </p>
              <button onClick={() => restartGame()}> Restart Quiz </button>
            </div>
          ) : (
            // Main Page section
            <div className="row p-3">
              {/* Review Answer Section - Left Side of Screen */}
              {/* Quiz section - Question with Answer and Prev, Next, and submit button */}
              <div className="col-md-6 question-card p-3">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <div className="button-sections text-right mb-3">
                    {/* Previous Button  */}
                    {currentQuestion > 0 && (
                      <button
                        className="text-light btn btn-info me-md-4"
                        onClick={() =>
                          setCurrentQuestion(currentQuestion - 1)
                        }
                      >
                        Prev
                      </button>
                    )}

                    {/* Next Button  */}
                    {currentQuestion < questions.length - 1 && (
                      <button
                        className="text-light btn btn-info"
                        onClick={() =>
                          setCurrentQuestion(currentQuestion + 1)
                        }
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>

                {/* Quiz Section Question and Options */}
                <h3>
                  {" "}
                  Question : {currentQuestion + 1} out of{" "}
                  {questions.length}{" "}
                </h3>
                <h4 className="question-text p-3">
                  Q. {currentQuestion + 1}.{" "}
                  {questions[currentQuestion].text}
                </h4>
                <ul>
                  <div className="justify-content-md-end">
                    {questions[currentQuestion].options.map((option) => {
                      return (
                        <div className="list">
                          <li
                            onClick={() => optionClicked(option)}
                            key={option.id}
                          >
                            {option.text}
                          </li>
                        </div>
                      );
                    })}
                  </div>
                </ul>

                {/* Submit Button */}
                {currentQuestion === questions.length - 1 && (
                  <button
                    className="ms-md-4 d-flex text-light btn btn-success"
                    onClick={() => submitClicked()}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Right side of the page */}
        <div className="w-1/4 bg-gray-100 p-4">
          <div className="topic-list">
            <h3 className=" topics-heading text-lg font-semibold mb-4">Topics</h3>
            <ul>
              {uniqueTopics.map((topic, index) => (
                <li key={index} className="text-sm">{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
