import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [chatData, setChatData] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setChatData((old) => [...old, message.data]);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  if (!socket) return <div>loading...</div>;

  return (
    <div>
      <div
        style={{
          marginTop: "10%",
          display: "flex",
          flexDirection: "column",
          height: "60vh",
          overflow: "auto",
        }}
      >
        {chatData?.map((data: string, index: number) => (
          <div key={index} style={{ margin: "10px 0" }}>
            {data}
          </div>
        ))}
      </div>
      <input type="text" onChange={(e) => setMsg(e.target.value)} value={msg} />
      <button
        type="submit"
        onClick={() => {
          socket?.send(msg);
          setMsg("");
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
