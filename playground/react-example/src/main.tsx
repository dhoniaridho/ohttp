import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HttpProvider } from "react-ohttp";
import { QueryClient } from "@tanstack/react-query";

console.log(HttpProvider)
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HttpProvider client={queryClient} baseURL="https://jsonplaceholder.typicode.com/">
      <App />
    </HttpProvider>
  </StrictMode>
);
