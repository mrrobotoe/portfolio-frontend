import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { RouterProvider } from "react-router-dom";

import { AppProvider } from "./main-provider";
import { createRouter } from "./routes";

const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = React.useMemo(() => createRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
