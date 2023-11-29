import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./components/router/Router";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Authprovider from "./components/provider/Authprovider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Authprovider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router}></RouterProvider>
        </QueryClientProvider>
      </Authprovider>
    </HelmetProvider>
  </React.StrictMode>
);
