import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "@views/chat";
import Config from "@/views/config/view";
import ConfigProvider from "./views/config";

const router = createBrowserRouter([
  {
    path: "/config",
    element: <Config />,
  },
  {
    path: "/chat",
    element: <Chat />,
    index: true,
  },
]);

function App() {
  return (
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
