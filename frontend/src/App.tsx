import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [code, setCode] = useState<string>("");
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);
  return (
    <NextUIProvider>
      <div className=" w-full h-[100vh] p-6">
        <div className="flex justify-between">
          <div className=" font-bold text-3xl">CollabCode</div>
          <div className=" flex gap-3">
            <ul className=" flex gap-2">
              {["boy", "girl", "public"].map((item, index) => (
                <li
                  className="h-10 aspect-square bg-zinc-200 rounded-full"
                  key={index}
                >
                  <img
                    src={`https://avatar.iran.liara.run/public/${item}`}
                    alt="user avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </li>
              ))}
            </ul>
            <button className=" bg-green-600 text-white font-bold px-6 py-2 rounded-sm">
              Run
            </button>
          </div>
        </div>
        <div className=" w-full h-[calc(100vh-7rem)] p-6 rounded-2xl mt-4 bg-zinc-50 outline-1">
          <textarea
            ref={inputRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full font-mono h-full resize-none outline-none border-none"
            placeholder="Type here..."
          ></textarea>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
