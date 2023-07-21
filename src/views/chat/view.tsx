import { Link } from "react-router-dom";
import { GearIcon } from "@components/GearIcon";
import { BackIcon } from "@components/BackIcon";
import { NewChat } from "./NewChat";
import { ChatListHistory } from "./ChatListHistory";
import { Chat } from "./Chat";

function View() {
  return (
    <div className="container mx-auto bg-slate-50 min-h-screen">
      <nav className="bg-[#F97316] p-6 justify-between flex">
        <Link className="border-2 border-white rounded p-1" to={`/chat`}>
          <BackIcon />
        </Link>

        <Link className="border-2 border-white rounded p-1" to={`/config`}>
          <GearIcon />
        </Link>
      </nav>
      <section className="p-6 flex md:space-x-6 flex-col md:flex-row space-y-6 md:space-y-0">
        <aside className="md:w-2/6 flex space-y-6 flex-col w-full">
          <NewChat />

          <ChatListHistory />
        </aside>
        <div className="md:w-4/6 w-full">
          <Chat />
        </div>
      </section>
    </div>
  );
}

export default View;
