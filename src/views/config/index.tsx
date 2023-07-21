import React from "react";

import { Config } from "@/core/entities/config";

type ConfigProviderProps = { children: React.ReactNode };

export type State = {
  temperature: number;
  maxTokens: number;
  model: string;
};

type Action = {
  type: "save_config";
  temperature: number;
  maxTokens: number;
  model: string;
};

type Dispatch = (action: Action) => void;

const Context = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const cardsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "save_config": {
      return {
        ...state,
        temperature: action.temperature,
        maxTokens: action.maxTokens,
        model: action.model,
      };
    }
    default: {
      throw new Error("this action doesn't exist");
    }
  }
};

const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const config = JSON.parse(localStorage.getItem("config")!) as Config;

  const [state, dispatch] = React.useReducer(cardsReducer, {
    temperature: config.temperature,
    maxTokens: config.maxTokens,
    model: config.model,
  });

  const value = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  React.useEffect(() => {
    localStorage.setItem(
      "config",
      JSON.stringify({
        temperature: state.temperature,
        maxTokens: state.maxTokens,
        model: state.model,
      })
    );
  }, [state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useConfig = () => {
  const context = React.useContext(Context);
  if (!context)
    throw new Error(`useConfig must be used within a ConfigProvider`);
  return context;
};

export { useConfig };

export default ConfigProvider;
