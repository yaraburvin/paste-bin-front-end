import { useEffect, useState } from "react";
import axios from "axios";
import { IPaste } from "./utils/types";
import { SinglePaste } from "./SinglePaste";

function App(): JSX.Element {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://paste-bin-yara-burvin.herokuapp.com/"
      : "http://localhost:4000";

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
  }, [allPastes, baseUrl]);
  return (
    <>
      {allPastes.map((el) => (
        <SinglePaste element={el} key={el.id} />
      ))}
    </>
  );
}

export default App;
