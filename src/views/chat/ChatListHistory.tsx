import { Conversation } from "@/core/entities/chat";
import { useChat } from "./";
import { SeachIcon } from "@/components/SeachIcon";
import { CheckIcon } from "@/components/CheckIcon";
import { CloseIcon } from "@/components/CloseIcon";

export function ChatMessage({
  conversation,
  onClick,
  currentConversation,
}: {
  conversation: Conversation;
  onClick: (id: number) => void;
  currentConversation: boolean;
}) {
  return (
    <div
      className={`flex rounded-md p-2  items-center cursor-pointer hover:bg-slate-100 ${
        currentConversation ? "bg-[#FDBA74]" : ""
      }`}
      onClick={() => onClick(conversation.id)}
    >
      <div className="w-1/6 flex items-center justify-center">
        <div className="rounded-full bg-[#FDBA74] w-7 h-7 flex items-center justify-center">
          <SeachIcon />
        </div>
      </div>
      <div className="w-full">
        <div>{conversation.title}</div>
      </div>
      <div className="w-1/6 flex">
        <div>
          <CheckIcon />
        </div>
        <div>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

export function ChatListHistory() {
  const { state, dispatch } = useChat();

  return (
    <div className="rounded-md bg-white drop-shadow-md">
      <div className="p-6">
        <h5>Historial de Búsquedas</h5>
      </div>

      <hr />

      <div className="p-6 space-y-2">
        {state.conversation.length === 0 ? (
          <p>todavia no hay conversaciones</p>
        ) : (
          state.conversation.map((conversation) => (
            <ChatMessage
              currentConversation={
                state.currentConversation === conversation.id
              }
              key={conversation.id}
              conversation={conversation}
              onClick={(id) => {
                dispatch({
                  type: "select_chat",
                  id: id,
                });
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}