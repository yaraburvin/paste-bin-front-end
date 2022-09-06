import { useEffect, useState } from "react";
import axios from "axios";
import { IPaste } from "./utils/types";
import { SinglePaste } from "./SinglePaste";
import { PostingWindow } from "./PostingWindow";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://paste-bin-yara-burvin.herokuapp.com/"
    : "http://localhost:4000";

function App(): JSX.Element {

  const [allPastes, setAllPastes] = useState<IPaste[]>([]);
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
        <PostingWindow allPastes={allPastes} setAllPastes={setAllPastes}/>
      </section>
      <p>The app is running! Connceted to heroku.</p>
      {allPastes.map((el) => (
        <SinglePaste element={el} key={el.id} />
      ))}
    </>
  );
}

export default App;
