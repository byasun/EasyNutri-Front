import React, { useState } from "react";
import HomePage from "./Quiz";
import "./App.css";

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

  const handleFinish = () => {
    const json = JSON.stringify(answers, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "respostas.json";
    link.click();

    setQuizStarted(false);
    setCurrentStep(0);
    setAnswers([]);
  };

  if (!quizStarted) {
    // Aqui só aparece exatamente a HomePage, nada mais
    return <HomePage onStart={handleStart} />;
  }

  if (currentStep >= 11) {
    handleFinish();
    return null; // ou pode retornar uma tela em branco, sem texto
  }

  return (
    <div className="App">
      {/* Renderização das páginas específicas do quiz conforme currentStep */}
      {/* Por enquanto, um botão para simular uma resposta */}
      <button onClick={() => handleAnswer({ step: currentStep, resposta: "Resposta Exemplo" })}>
        Responder e Avançar
      </button>
    </div>
  );
}

export default App;

