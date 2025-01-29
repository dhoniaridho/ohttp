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
  children: React.JSX.Element;
  baseURL: string;
  client: QueryClient;
}) {
  return (
    <HttpContext.Provider value={{ baseURL: baseURL }}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </HttpContext.Provider>
  );
}
