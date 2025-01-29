import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HttpProvider } from "react-ohttp";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HttpProvider
      client={queryClient}
      baseURL="https://jsonplaceholder.typicode.com/"
      beforeRequest={(config) => {
        console.log(config);
        config.headers.Authorization = `Bearer ${Math.random()}`;
        return config;
      }}
      onFulfill={(response) => {
        console.log(response);
        return response;
      }}
      onReject={(error) => {
        console.log(error);
        throw error;
      }}
    >
      <App />
    </HttpProvider>
  </StrictMode>
);
