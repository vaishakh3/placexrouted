import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import './CareerRoadmapProvider.css'; // Import CSS file for styling

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyB1cTvePPDZuSy8pBF2AL4NtuBsPOkkTZs";
const MAX_RESPONSES = 2; // Maximum number of responses to display

const CareerRoadmapProvider = () => {
  const [responses, setResponses] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [responseCount, setResponseCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const runChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        };

        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];

        const chat = model.startChat({
          generationConfig,
          safetySettings,
          history: [
            {
              role: "user",
              parts: [{ text: "You are a career roadmap maker. Suggest a proper career roadmap based on the preferred career option of the user. Just ask for career option. no more questions. limit response to avoid rate limit." }],
            },
            {
              role: "model",
              parts: [{ text: "## Creating Your Career Roadmap:**" }],
            },
          ],
        });

        const result = await chat.sendMessage(userInput);
        const response = result.response;
        setResponses([...responses, response.text()]);
        setResponseCount(responseCount + 1); // Increment the response count
        setUserInput(''); // Clear the input after sending message
        setError(null); // Clear any previous errors
      } catch (error) {
        setError("An error occurred. Please try again later."); // Set error message
      }
    };

    if (userInput.trim() !== '' && responses.length < MAX_RESPONSES) {
      runChat();
    }
  }, [userInput, responses, responseCount]); // Dependencies added to run the chat when userInput or responses change

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    // You can add validation or additional logic here before sending the message
    if (userInput.trim() !== '') {
      setResponses([...responses, userInput]); // Add user input to responses
    }
  };

  return (
    <div className="career-roadmap-container">
      <h1 className="career-roadmap-title">Career Roadmap Provider</h1>
      {error && <p className="error-message">{error}</p>} {/* Display error message if error state is set */}
      {responses.map((response, index) => (
        <div key={index} className="response-container" dangerouslySetInnerHTML={{ __html: response }} />
      ))}
      <div className="input-container">
        <input
          className="user-input"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter your preferred career option"
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default CareerRoadmapProvider;
