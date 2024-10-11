import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [chatData, setChatData] = useState<string[]>([]);

  useEffect(() => {
    if (!query) return;
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send(query);
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setChatData((old) => [...old, message.data]);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, [query]);

  return (
    <>
      <input type="text" onChange={(e) => setMsg(e.target.value)} />
      <button type="submit" onClick={() => setQuery(msg)}>
        Send
      </button>
      <div
        style={{ marginTop: "10%", display: "flex", flexDirection: "column" }}
      >
        {chatData?.map((data: string,index:number) => (
          <div key={index} style={{ margin: "10px 0" }}>{data}</div>
        ))}
      </div>
    </>
  );
}

export default App;
