import { useRef, useState } from "react";
import axios from "axios";
import "./App.css";

// const API_KEY = "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";
// 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

function App() {
  const [isImage, setIsImage] = useState("/");
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setIsImage(data_array[0].url);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-100 underline">
        Hello world!
      </h1>

      <img
        className="rounded-lg shadow-xl mx-auto mb-4 mt-4"
        src={isImage}
        alt=""
      />

      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          ref={inputRef}
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Write image prompt"
        />
        <button
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
          onClick={() => imageGenerator()}
        >
          Generate
        </button>
      </div>

      {/* <input type="text" ref={inputRef} />
      <button onClick={() => imageGenerator()} className="text-white">
        Click
      </button> */}
    </>
  );
}

export default App;
