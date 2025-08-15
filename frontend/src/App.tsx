import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Avatar from "./components/Avatar";
import { executeCode } from "./utils/excecuteCode";

function App() {
  const [document, setDocument] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:3001");
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "init") {
          setDocument(message.data);
        } else if (message.type === "update") {
          setDocument(message.data);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDocument = e.target.value;
    setDocument(newDocument);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "update", data: newDocument }));
    }
  };

  const handleRun = async () => {
    const result = await executeCode(document);
    setOutput(result.output);
    setError(result.error);
  };

  return (
    <NextUIProvider>
      <div className=" w-full h-[100vh] p-6">
        <div className="flex justify-between">
          <div className=" font-bold text-3xl">CollabCode</div>
          <div className=" flex gap-3">
            <ul className=" flex gap-2">
              {["boy", "girl"].map((item, index) => (
                <Avatar key={index} item={item} index={index} />
              ))}
            </ul>
            <button
              onClick={handleRun}
              className=" bg-green-600 text-white font-bold px-6 py-2 rounded-sm cursor-pointer"
            >
              Run
            </button>
          </div>
        </div>
        <div className=" w-full h-[calc(100vh-7rem)] p-6 rounded-2xl mt-4 bg-zinc-50 outline-1 grid grid-cols-[5fr_3fr] gap-4 items-end">
          <CodeEditor
            value={document}
            onChange={handleChange}
            placeholder="Type here..."
            language="javascript"
          />
          <div className=" bg-zinc-100 h-1/4 rounded-2xl shadow-lg p-4">
            <p className=" text-lg font-bold">Output:</p>
            <p className=" text-sm text-zinc-500">{output}</p>
            <p className=" text-sm text-red-500">{error}</p>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
