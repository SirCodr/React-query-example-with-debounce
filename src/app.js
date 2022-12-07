import React, { useRef, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import useDebounce from "./hooks/useDebounce";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
};

const Example = () => {
  const debounceInputRef = useRef();
  const nonDebounceInputRef = useRef();
  const [user, setUser] = useState("midudev");
  const [delay, setDelay] = useState(1000);
  const userDebounced = useDebounce(user, delay);

  const { isLoading, error, data } = useQuery(["repoData", userDebounced], () =>
    fetch(`https://api.github.com/users/${userDebounced}`).then((res) =>
      res.json()
    )
  );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
        <div>
          <label htmlFor="debounceCheckbox">Con debounce</label>
          <input
            id="debounceCheckbox"
            type="checkbox"
            value="1"
            checked={delay !== 0 ? true : false}
            ref={debounceInputRef}
            onChange={(e) => {
              setDelay(e.target.checked ? 1000 : 0);
            }}
          />
        </div>

        <div>
          <label htmlFor="nonDebounceCheckbox">Sin debounce</label>
          <input
            type="checkbox"
            id="nonDebounceCheckbox"
            value="0"
            checked={delay === 0 ? true : false}
            ref={nonDebounceInputRef}
            onChange={(e) => {
              setDelay(!e.target.checked ? 1000 : 0);
            }}
          />
        </div>
      </div>
      <input
        type="text"
        defaultValue={user}
        onKeyUp={(e) => {
          setUser(e.target.value);
        }}
      />
      {data && (
        <div>
          <h1>{data.name}</h1>
          <p>{data.bio}</p>
          <strong>👀 {data.followers}</strong>{" "}
        </div>
      )}
      {isLoading && "Loading..."}
    </div>
  );
};

export default App;
