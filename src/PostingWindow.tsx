import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./App";
import { IPaste } from "./utils/types";

interface Iprops {
  allPastes: IPaste[];
  setAllPastes: React.Dispatch<React.SetStateAction<IPaste[]>>;
}
export function PostingWindow({
  allPastes,
  setAllPastes,
}: Iprops): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const handleSubmit = async () => {
    try {
      const response: IPaste = await axios.post(baseUrl + "/pastes/", {
        title: title,
        content: content,
      });
      console.log(response);
      setAllPastes([response, ...allPastes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="input-box"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your text here."
      >
        {" "}
      </textarea>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}
