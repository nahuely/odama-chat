import { BackIcon } from "@/components/BackIcon";
import { Link } from "react-router-dom";

function View() {
  return (
    <div className="container mx-auto bg-slate-50 min-h-screen">
      <nav className="bg-[#F97316] p-6 justify-between flex">
        <Link className="border-2 border-white rounded p-1" to={`/chat`}>
          <BackIcon />
        </Link>
      </nav>
      <section className="p-6">
        <div className="rounded-md bg-white p-6 drop-shadow-md">
          <h3 className="text-xl text-slate-800 mb-3">Configuracion</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label className="block mb-2" htmlFor="prompt">
                temperature
              </label>
              <input
                id="prompt"
                type="range"
                min="0"
                max="2"
                step="0.1"
                placeholder="Insertar prompt"
                onChange={(e) => {
                  // setNewPrompt(e.target.value);
                }}
                // value={newPrompt}
                className="border-2 border-slate-400 rounded  p-2"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="tokens">
                max tokens
              </label>
              <input
                id="tokens"
                type="range"
                min="0"
                max="256"
                step="1"
                placeholder="Insertar prompt"
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="model">
                model
              </label>
              <select
                id="model"
                className="border-2 border-slate-400 rounded  p-2"
              >
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              </select>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-slate-800 text-white rounded p-2"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default View;
