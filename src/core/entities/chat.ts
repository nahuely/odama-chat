export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  id: number;
  title: string;
  messages: Message[];
}

export const isHuman = (message: Message): boolean => message.role === "user";

export type Conversations = Conversation[];
