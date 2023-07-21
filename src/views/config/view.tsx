import { BackIcon } from "@/components/BackIcon";
import { Link } from "react-router-dom";
import { useConfig } from ".";
import { useSnackbar } from "notistack";
import React from "react";

function View() {
  const { state, dispatch } = useConfig();
  const [temperature, setTemperature] = React.useState(state.temperature);
  const [maxTokens, setMaxTokens] = React.useState(state.maxTokens);
  const [model, setModel] = React.useState(state.model);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className="container mx-auto bg-slate-50 min-h-screen">
      <nav className="bg-[#F97316] p-6 justify-between flex">
        <Link
          className="border-2 border-white rounded p-1"
          to={`/`}
          title="Chat"
        >
          <BackIcon />
        </Link>
      </nav>
      <section className="p-6">
        <div className="rounded-md bg-white p-6 drop-shadow-md">
          <h3 className="text-xl text-slate-800 mb-3 font-bold">
            Configuracion
          </h3>

          <form
            onSubmit={(e) => {
              try {
                e.preventDefault();
                dispatch({
                  type: "save_config",
                  temperature,
                  maxTokens,
                  model,
                });
                enqueueSnackbar("Configuracion guardada", {
                  variant: "success",
                });
              } catch (error) {
                enqueueSnackbar("Hubo un error al guardar la configuracion", {
                  variant: "error",
                });
              }
            }}
          >
            <div className="mb-6">
              <label className="block mb-2" htmlFor="temperature">
                temperature
              </label>
              <div className="flex items-center">
                <input
                  id="temperature"
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue={state.temperature}
                  onChange={(e) => {
                    setTemperature(Number(e.target.value));
                  }}
                  className="mr-2"
                />
                <span className="text-slate-800">{temperature}</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2" htmlFor="tokens">
                max tokens
              </label>
              <div className="flex items-center">
                <input
                  className="mr-2"
                  id="tokens"
                  type="range"
                  min="0"
                  max="256"
                  step="1"
                  onChange={(e) => {
                    setMaxTokens(Number(e.target.value));
                  }}
                  defaultValue={state.maxTokens}
                />
                <span className="text-slate-800">{maxTokens}</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2" htmlFor="model">
                model
              </label>
              <select
                id="model"
                defaultValue={state.model}
                className="border-2 border-slate-400 rounded p-2"
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              >
                <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
                <option value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613</option>
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
