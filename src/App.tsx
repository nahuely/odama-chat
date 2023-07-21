import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "@views/chat";
import Config from "@/views/config/view";
import ConfigProvider from "./views/config";
import { SnackbarProvider } from "notistack";

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
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={3000}
      preventDuplicate={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </SnackbarProvider>
  );
}

export default App;
