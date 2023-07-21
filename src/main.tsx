import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const init = () => {
  const isInitialized = localStorage.getItem("initialized");
  if (!isInitialized) {
    localStorage.setItem("initialized", "true");
    localStorage.setItem(
      "config",
      JSON.stringify({
        temperature: 0.5,
        maxTokens: 256,
        model: "gpt-3.5-turbo",
      })
    );
    localStorage.setItem("conversations", JSON.stringify([]));
  }
};

init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
