# React HTTP

This package provides a set of React hooks for making HTTP requests.

## Installation

You can install the package using npm or yarn:

```bash
npm install react-ohttp
```

or

```bash
pnpm add react-ohttp
```

## Usage

### Register the Provider to the Root Application

```jsx
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
```

### useHttp

The `useHttp` hook is used to make HTTP requests with various methods.

```jsx
import React from "react";
import { useHttp } from "react-ohttp";

const ExampleComponent = () => {
  const { data, error, isLoading } = useHttp(
    "https://api.example.com/data/{id}",
    {
      method: "GET",
      searchParams: { key: "value" },
      vars: {
        id: "123",
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExampleComponent;
```

### useHttpMutation

The `useHttpMutation` hook is used to make HTTP requests with mutation methods like POST, PUT, DELETE, etc.

```jsx
import React from "react";
import { useHttpMutation } from "@ohttp/react-http";

const ExampleComponent = () => {
  const { mutate, isPending } = useHttpMutation("todo", { method: "POST" });

  const onCreate = (data: object) => {
    mutate(
      {
        body: data,
      },
      {
        onError: (err) => {
          alert(err.data.message);
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => handleSubmit({ key: "value" })}>Submit</button>
    </div>
  );
};

export default ExampleComponent;
```

### API

#### useHttp

- `url` (string): The URL to make the HTTP request to.
- `options` (object): Configuration options for the request.
  - `method` (string): The HTTP method to use (default is 'GET').
  - `params` (object): Query parameters to include in the request.
  - `httpOptions` (object): Additional Axios request configuration options.
  - `queryOptions` (object): React Query options.
- Returns an object with the following properties:
  - `data`: The response data.
  - `error`: Any error that occurred.
  - `isLoading`: Whether the request is in progress.

#### useHttpMutation

- `url` (string): The URL to make the HTTP request to.
- `options` (object): Configuration options for the request.
  - `method` (string): The HTTP method to use.
  - `httpOptions` (object): Additional Axios request configuration options.
  - `queryOptions` (object): React Query options.
- Returns an object with the following properties:
  - `mutate`: A function to trigger the mutation.
  - `isLoading`: Whether the request is in progress.
  - `isError`: Whether an error occurred.
  - `error`: The error that occurred.
