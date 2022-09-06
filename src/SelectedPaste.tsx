import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "./App";
import { IPaste } from "./utils/types";

interface ISelected {
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}
export function SelectedPaste({
  selectedId,
  setSelectedId,
}: ISelected): JSX.Element {
  const [currentPaste, setCurrentPaste] = useState<IPaste | null>(null);
  useEffect(() => {
    try {
      const getPastes = async () => {
        const response = await axios.get(baseUrl + `/pastes/${selectedId}`);

        setCurrentPaste(response.data[0]);
      };
      getPastes();
    } catch (err) {
      console.error(err);
    }
  }, [selectedId]);

  return (
    <div>
      {currentPaste !== null && (
        <div>
          <h3>{currentPaste.title} </h3>
          <p>{currentPaste.content}</p>
          <div>{currentPaste.date}</div>
          <button onClick={() => setSelectedId(null)}>X</button>
        </div>
      )}
    </div>
  );
}
