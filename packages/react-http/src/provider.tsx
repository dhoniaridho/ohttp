import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { type ReactNode } from "react";

export const HttpContext = React.createContext({
  baseURL: "",
});

export default function Provider({
  children,
  baseURL,
  client,
}: {
  children: ReactNode;
  baseURL: string;
  client: QueryClient;
}) {
  return (
    <HttpContext.Provider value={{ baseURL: baseURL }}>
      {children}
      <QueryClientProvider client={client}></QueryClientProvider>
    </HttpContext.Provider>
  );
}
