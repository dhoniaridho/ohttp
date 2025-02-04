# Vue HTTP

This package provides a set of Vue hooks for making HTTP requests.

## Installation

You can install the package using npm or yarn:

```bash
npm install vue-ohttp
```

or

```bash
pnpm add vue-ohttp
```

## Usage

### useHttp

The `useHttp` hook is used to make HTTP requests with various methods.

```jsx
import Vue from "vue";
import { useHttp } from "vue-http";

const ExampleComponent = () => {
  const { data, error, isLoading } = useHttp(
    "https://api.example.com/data/{id}",
    {
      method: "GET",
      searchParam: { key: "value" },
      vars: {
        id: "1",
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
import Vue from "vue";
import { useHttpMutation } from "vue-http";

const ExampleComponent = () => {
  const { mutate, isLoading, isError, error } = useHttpMutation(
    "https://api.example.com/data/{id}",
    {
      method: "POST",
      httpOptions: { timeout: 30000 },
      queryOptions: {
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error),
      },
    }
  );

  const handleSubmit = (data) => {
    mutate({
      body: data,
      searchParams: {},
      vars: { id: "10" },
    });
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
  - `queryOptions` (object): Vue Query options.
- Returns an object with the following properties:
  - `data`: The response data.
  - `error`: Any error that occurred.
  - `isLoading`: Whether the request is in progress.

#### useHttpMutation

- `url` (string): The URL to make the HTTP request to.
- `options` (object): Configuration options for the request.
  - `method` (string): The HTTP method to use.
  - `httpOptions` (object): Additional Axios request configuration options.
  - `queryOptions` (object): Vue Query options.
- Returns an object with the following properties:
  - `mutate`: A function to trigger the mutation.
  - `isLoading`: Whether the request is in progress.
  - `isError`: Whether an error occurred.
  - `error`: The error that occurred.
