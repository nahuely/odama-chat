import React from "react";
import axios from "axios";

import View from "./view";
import { Conversation, Conversations } from "@core/entities/chat";
import { API_ENDPOINT } from "@/core/constants";
import { State as StateConfig } from "@/views/config";
import { EnqueueSnackbar } from "notistack";

type State = {
  error: string | null;
  conversation: Conversations;
  currentConversation: number | null;
  sendingMessage: boolean;
};

type Action =
  | { type: "select_chat"; id: number }
  | { type: "add_conversation"; request: string; response: string; id: number }
  | {
      type: "add_message";
      request: string;
      response: string;
      conversationId: number;
    }
  | { type: "delete_chat"; id: number }
  | {
      type: "set_sending_message";
      sendingMessage: boolean;
    };

type Dispatch = (action: Action) => void;

const Context = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const cardsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "delete_chat": {
      return {
        ...state,
        conversation: state.conversation.filter(
          (conversation) => conversation.id !== action.id
        ),
      };
    }
    case "set_sending_message": {
      return {
        ...state,
        sendingMessage: action.sendingMessage,
      };
    }
    case "add_conversation": {
      return {
        ...state,
        conversation: [
          ...state.conversation,
          {
            id: action.id,
            title: action.request,
            messages: [
              {
                role: "user",
                content: action.request,
              },
              {
                role: "assistant",
                content: action.response,
              },
            ],
          },
        ],
        currentConversation: state.conversation.length + 1,
      };
    }
    case "select_chat": {
      return {
        ...state,
        currentConversation:
          action.id === state.currentConversation ? null : action.id,
      };
    }
    case "add_message": {
      const conversation = state.conversation.find(
        (conversation) => conversation.id === action.conversationId
      );
      if (!conversation) return state;
      return {
        ...state,
        conversation: [
          ...state.conversation.filter(
            (conversation) => conversation.id !== action.conversationId
          ),
          {
            ...conversation,
            messages: [
              ...conversation.messages,
              {
                role: "user",
                content: action.request,
              },
              {
                role: "assistant",
                content: action.response,
              },
            ],
          },
        ],
      };
    }
    default: {
      throw new Error("this action doesn't exist");
    }
  }
};

const ChatProvider = () => {
  const conversations = JSON.parse(
    localStorage.getItem("conversations")!
  ) as Conversations;
  const [state, dispatch] = React.useReducer(cardsReducer, {
    error: null,
    conversation: conversations,
    currentConversation: null,
    sendingMessage: false,
  });

  const value = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  React.useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(state.conversation));
  }, [state]);

  return (
    <Context.Provider value={value}>
      <View />
    </Context.Provider>
  );
};

const addNewConversation = async (
  dispatch: Dispatch,
  state: State,
  configState: StateConfig,
  enqueueSnackbar: EnqueueSnackbar,
  prompt: string
) => {
  const newConversationId = state.conversation.length + 1;

  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: configState.model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: configState.temperature,
        max_tokens: configState.maxTokens,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
        },
      }
    );

    dispatch({
      type: "add_conversation",
      id: newConversationId,
      request: prompt,
      response: response.data.choices[0].message.content as string,
    });
  } catch (error) {
    console.error(error);
    enqueueSnackbar("Hubo un error al crear la conversacion", {
      variant: "error",
    });
  }
};

const sendMessage = async (
  dispatch: Dispatch,
  state: State,
  configState: StateConfig,
  enqueueSnackbar: EnqueueSnackbar,
  message: string
) => {
  const currentConversation = currentConversationSelector(state);

  dispatch({
    type: "set_sending_message",
    sendingMessage: true,
  });

  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: configState.model,
        messages: [
          ...currentConversation!.messages,
          {
            role: "user",
            content: message,
          },
        ],
        temperature: configState.temperature,
        max_tokens: configState.maxTokens,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
        },
      }
    );

    dispatch({
      type: "add_message",
      request: message,
      response: response.data.choices[0].message.content,
      conversationId: currentConversation!.id,
    });
  } catch (error) {
    console.error(error);
    enqueueSnackbar("Hubo un error al enviar el mensaje", {
      variant: "error",
    });
  } finally {
    dispatch({
      type: "set_sending_message",
      sendingMessage: false,
    });
  }
};

const currentConversationSelector = (state: State): Conversation | null => {
  if (!state.currentConversation) return null;
  return (
    state.conversation.find(
      (conversation) => conversation.id === state.currentConversation
    ) || null
  );
};

const useChat = () => {
  const context = React.useContext(Context);
  if (!context) throw new Error(`useChat must be used within a ChatProvider`);
  return context;
};

export {
  useChat,
  sendMessage,
  currentConversationSelector,
  addNewConversation,
};

export default ChatProvider;
