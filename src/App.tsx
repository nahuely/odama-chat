import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "@views/chat";
import Config from "@views/config";

const router = createBrowserRouter(
  [
    {
      path: "/chat",
      element: <Chat />,
    },
    {
      path: "/config",
      element: <Config />,
    },
  ],
  {}
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
