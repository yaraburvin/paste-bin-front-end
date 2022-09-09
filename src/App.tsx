import { useEffect, useState } from "react";
import axios from "axios";
import { IPaste } from "./utils/interfaces";
import { SinglePaste } from "./components/SinglePaste";
import { PastePosting } from "./components/PastePosting";
import { SelectedPaste } from "./components/SelectedPaste";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://paste-bin-yara-burvin.herokuapp.com"
    : "http://localhost:4000";

function App(): JSX.Element {
  const [allPastes, setAllPastes] = useState<IPaste[]>([]);
  const [selectedPasteId, setSelectedPasteId] = useState<number | null>(null);
  const [updateAllPastes, setUpdateAllPastes] = useState<number>(0);
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
  }, [updateAllPastes]);
  return (
    <>
      <header>
        <h1>Paste Bin App</h1>
      </header>
      <main className="wrapper">
        <section className="submission-field">
          <PastePosting
            updateAllPastes={updateAllPastes}
            setUpdateAllPastes={setUpdateAllPastes}
          />
        </section>
        <section className="paste-list">
          {allPastes.map((el) => (
            <div onClick={() => setSelectedPasteId(el.id)} key={el.id}>
              {" "}
              <SinglePaste element={el} />{" "}
            </div>
          ))}
        </section>
        <section className="selected-paste">
          {selectedPasteId !== null && (
            <SelectedPaste
              selectedPasteId={selectedPasteId}
              setSelectedPasteId={setSelectedPasteId}
              updateAllPastes={updateAllPastes}
              setUpdateAllPastes={setUpdateAllPastes}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default App;
