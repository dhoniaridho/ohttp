import "./App.css";
import { useHttp, useHttpMutation } from "react-ohttp";

function App() {
  type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };

  const { data, isLoading } = useHttp<Todo[]>("todos/{id}", {
    method: "GET",
    vars: {
      id: "test",
    },
  });

  const { mutate, isPending } = useHttpMutation("todo", { method: "POST" });

  const onCreate = () => {
    mutate(
      {
        body: {
          userId: 1,
          id: 1,
          title: "Learn React",
          completed: false,
        },
      },
      {
        onError: (err) => {
          alert(err.data.message);
        },
      }
    );
  };

  return (
    <div
      style={{
        maxWidth: "92rem",
        display: "flex",
        flexDirection: "column",
        placeItems: "start",
        justifyContent: "start",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <div>List Todo</div>
      <div>
        <button onClick={onCreate}>
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
      {isLoading && <div>Loading...</div>}

      <ul
        style={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {data?.map((todo) => (
          <li
            key={todo.id}
            style={{
              width: "30%",
              listStyle: "none",
              padding: "1rem",
              border: "1px solid #ccc",
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
