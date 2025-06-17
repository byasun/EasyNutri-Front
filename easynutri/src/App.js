import React, { useState } from "react";
import HomePage from "./Quiz";
import "./App.css";
import { enviarUserDataParaPagamento } from "./envio"; // Importação

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleStart = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (answer) => {
    setAnswers(prev => [...prev, answer]);
    setCurrentStep(prev => prev + 1);
  };

  const handleFinish = async () => {
    try {
      await enviarUserDataParaPagamento(answers); // Envia para o backend
      alert("Dados enviados com sucesso!");
    } catch (error) {
      alert("Erro ao enviar dados para o backend.");
    }
    setQuizStarted(false);
    setCurrentStep(0);
    setAnswers([]);
  };

  if (!quizStarted) {
    return <HomePage onStart={handleStart} />;
  }

  if (currentStep >= 11) {
    handleFinish();
    return null;
  }

  return (
    <div className="App">
      <button onClick={() => handleAnswer({ step: currentStep, resposta: "Resposta Exemplo" })}>
        Responder e Avançar
      </button>
    </div>
  );
}

export default App;

