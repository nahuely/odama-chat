import { Link } from "react-router-dom";
import { SeachIcon } from "./SeachIcon";
import { CheckIcon } from "./CheckIcon";
import { CloseIcon } from "./CloseIcon";
import { GearIcon } from "./GearIcon";
import { BackIcon } from "./BackIcon";

function ChatMessage() {
  return (
    <div className="flex rounded-md h-20 items-center">
      <div className="w-1/6 flex items-center justify-center">
        <div className="rounded-full bg-[#FDBA74] w-7 h-7 flex items-center justify-center">
          <SeachIcon />
        </div>
      </div>
      <div className="w-full">
        <div>User Flow</div>
        <div>Hoy, quedan 24 hs.</div>
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

function Chat() {
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
      <section className="p-6 flex space-x-6">
        <aside className="w-2/6 flex space-y-6 flex-col">
          <div className="rounded-md bg-white p-6 drop-shadow-md">
            <h3 className="text-xl text-slate-800 mb-3">Sistema</h3>
            <p className="mb-6">
              Para conseguir una respuesta adecuada a tus necesidades, escribe
              un prompt para el sistema.
            </p>
            <input
              type="text"
              placeholder="Insertar prompt"
              className="border-2 border-slate-400 rounded w-full p-2"
            />
          </div>

          <div className="rounded-md bg-white drop-shadow-md">
            <div className="p-6">
              <h5>Historial de Búsquedas</h5>
            </div>

            <hr />

            <div className="p-6">
              <ChatMessage />
              <ChatMessage />
              <ChatMessage />
              <ChatMessage />
            </div>
          </div>
        </aside>
        <main className="rounded-md bg-white w-4/6 drop-shadow-md flex flex-col">
          <div className="flex justify-between p-6">
            <div>OdamaChat</div>
            <button>Nueva Búsqueda</button>
          </div>
          <hr />
          <div className="bg-slate-50 p-4">
            <div className="drop-shadow-sm p-4 bg-white">
              <div className="mb-3">
                Ana Clara <span>05:00 pm</span>
              </div>
              <hr className="mb-3" />
              <div>
                Lorem ipsum dolor Sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </div>
            </div>
          </div>
          <div>
            <div className="flex p-4">fasdfs</div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Chat;
