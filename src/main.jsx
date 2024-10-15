import ReactDOM from "react-dom/client";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { routeTree } from "./routeTree.gen";

import { useDataStore } from "./store";

const rootElement = document.getElementById("root");

if (rootElement) {

  const nonce = rootElement.getAttribute("data-nonce");
  const homeUrl = rootElement.getAttribute("data-home-url");
  
  const { setNonce, setHomeUrl } = useDataStore.getState();
  
  setNonce(nonce);
  setHomeUrl(homeUrl);
  
  
  const root = ReactDOM.createRoot(rootElement);
  const queryClient = new QueryClient();
  const router = createRouter({ routeTree, basepath: "/tnlb2b/" });

  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
