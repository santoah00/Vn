import React, { useState } from "react";

const App = () => {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState({ color: "", number: null });

  const colors = ["Red", "Green", "Violet"];
  const numbers = Array.from({ length: 10 }, (_, i) => i); // 0–9

  const predictNext = () => {
    if (history.length === 0) {
      setPrediction({
        color: colors[Math.floor(Math.random() * colors.length)],
        number: numbers[Math.floor(Math.random() * numbers.length)],
      });
    } else {
      const last = history[history.length - 1];
      const nextColor = colors[(colors.indexOf(last.color) + 1) % colors.length];
      const nextNumber = (last.number + 1) % 10;
      setPrediction({ color: nextColor, number: nextNumber });
    }
  };

  const submitResult = () => {
    setHistory([...history, prediction]);
    setPrediction({ color: "", number: null });
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">Color & Number Predictor</h1>
      <div className="mb-4">
        <button
          onClick={predictNext}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Predict
        </button>
      </div>
      {prediction.color && (
        <div className="mb-4 text-xl">
          Prediction: <strong>{prediction.color}</strong> -{" "}
          <strong>{prediction.number}</strong>
        </div>
      )}
      <button
        onClick={submitResult}
        disabled={!prediction.color}
        className="bg-green-500 text-white px-4 py-2 rounded shadow disabled:opacity-50"
      >
        Submit
      </button>

      <h2 className="text-lg font-semibold mt-6">History:</h2>
      <ul className="mt-2">
        {history.map((entry, i) => (
          <li key={i}>
            {entry.color} - {entry.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
