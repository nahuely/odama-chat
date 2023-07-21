import { isHuman } from "@/core/entities/chat";
import { currentConversationSelector, sendMessage, useChat } from "./";
import React from "react";

export function Chat() {
  const { state, dispatch } = useChat();
  const bottomRef = React.useRef(null);
  const [newMessage, setNewMessage] = React.useState("");

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.conversation]);

  return (
    <main className="rounded-md bg-white w-4/6 drop-shadow-md flex flex-col">
      <div className="flex p-6">
        <div>OdamaChat</div>
      </div>
      <hr />
      {currentConversationSelector(state) === null ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-xl">Selecciona una conversación</div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="overflow-y-scroll h-[500px]">
            {currentConversationSelector(state)?.messages.map(
              (message, index) => (
                <div className="bg-slate-50 p-4" key={index}>
                  <div className="drop-shadow-sm p-4 bg-white">
                    <div
                      className={`mb-3 ${
                        isHuman(message) ? "text-[#10B981]" : "text-[#F97316]"
                      }`}
                    >
                      {message.role}
                    </div>
                    <hr className="mb-3" />
                    <div>{message.content}</div>
                  </div>
                </div>
              )
            )}
            <div ref={bottomRef} />
          </div>

          <div className="mt-auto">
            <div className="flex p-4">
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(dispatch, state, newMessage);
                  setNewMessage("");
                }}
              >
                <input
                  maxLength={1000}
                  type="text"
                  placeholder="Insertar prompt"
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  value={newMessage}
                  autoFocus
                  className="border-2 border-slate-400 rounded w-full p-2 mb-1"
                />
                <p className="text-right text-xs">{newMessage.length}/1000</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
