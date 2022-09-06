import { useEffect, useState } from "react";
import axios from "axios";
import { IPaste } from "./utils/types";
import { SinglePaste } from "./SinglePaste";
import { PostingWindow } from "./PostingWindow";
import { SelectedPaste } from "./SelectedPaste";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://paste-bin-yara-burvin.herokuapp.com"
    : "http://localhost:4000";

function App(): JSX.Element {
  const [allPastes, setAllPastes] = useState<IPaste[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  useEffect(() => {
    try {
      const getPastes = async () => {
        const response = await axios.get(baseUrl + "/pastes/");
        setAllPastes(response.data);
      };
      getPastes();
    } catch (err) {
      console.error(err);
    }
  }, [allPastes]);
  return (
    <>
      <section className="submission-field">
        <PostingWindow allPastes={allPastes} setAllPastes={setAllPastes} />
      </section>
      <p>The app is running! Connceted to heroku.</p>
      {allPastes.map((el) => (
        <div onClick={() => setSelectedId(el.id)} key={el.id}>
          {" "}
          <SinglePaste element={el} />{" "}
        </div>
      ))}
      {selectedId !== null && (
        <SelectedPaste selectedId={selectedId} setSelectedId={setSelectedId} />
      )}
    </>
  );
}

export default App;
