import { Conversation } from "@/core/entities/chat";
import { useChat } from "./";
import { SeachIcon } from "@/components/SeachIcon";
import { TrashIcon } from "@/components/TrashIcon";

export function ChatMessage({
  conversation,
  onClick,
  onDelete,
  currentConversation,
}: {
  conversation: Conversation;
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
  currentConversation: boolean;
}) {
  return (
    <div
      className={`flex rounded-md p-2  items-center cursor-pointer 
       transition duration-300 ease-in-out hover:bg-slate-100 ${
         currentConversation ? "bg-[#FDBA74]" : ""
       }`}
      title="Seleccionar conversación"
      onClick={() => onClick(conversation.id)}
    >
      <div className="w-1/6 flex items-center justify-center mr-2">
        <div className="rounded-full bg-[#FDBA74] w-10 h-10 flex items-center justify-center">
          <SeachIcon />
        </div>
      </div>
      <div className="w-4/6">
        <div className="text-ellipsis overflow-hidden">
          {conversation.title}
        </div>
      </div>
      <div className="w-1/6 flex align-middle justify-center">
        {!currentConversation && (
          <div
            title="Eliminar conversación"
            onClick={() => {
              onDelete(conversation.id);
            }}
          >
            <TrashIcon />
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatListHistory() {
  const { state, dispatch } = useChat();

  return (
    <div className="rounded-md bg-white drop-shadow-md">
      <div className="p-6">
        <h5 className="font-bold">Historial de Búsquedas</h5>
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
              onDelete={(id) => {
                dispatch({
                  type: "delete_chat",
                  id: id,
                });
              }}
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
