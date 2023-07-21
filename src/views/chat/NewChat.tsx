import { addNewConversation, useChat } from "./";
import React from "react";

export function NewChat() {
  const { state, dispatch } = useChat();
  const [newPrompt, setNewPrompt] = React.useState("");

  return (
    <div className="rounded-md bg-white p-6 drop-shadow-md">
      <h3 className="text-xl text-slate-800 mb-3">Sistema</h3>
      <p className="mb-6">
        Para conseguir una respuesta adecuada a tus necesidades, escribe un
        prompt para el sistema.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewConversation(dispatch, state, newPrompt);
          setNewPrompt("");
        }}
      >
        <input
          type="text"
          placeholder="Insertar prompt"
          onChange={(e) => {
            setNewPrompt(e.target.value);
          }}
          value={newPrompt}
          className="border-2 border-slate-400 rounded w-full p-2"
        />
      </form>
    </div>
  );
}
