import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "./App";
import { CommentPosting } from "./CommentPosting";
import { SingleComment } from "./SingleComment";
import { dateFormat } from "./utils/dateFormat";
import { IComment, IPaste } from "./utils/types";

interface ISelected {
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  setAllPastes: React.Dispatch<React.SetStateAction<IPaste[]>>;
}
export function SelectedPaste({
  selectedId,
  setSelectedId,
  setAllPastes,
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

  const [allComments, setAllComments] = useState<IComment[]>([]);
  const [writeComment, setWriteComment] = useState<boolean>(false);
  useEffect(() => {
    try {
      const getComments = async () => {
        const response = await axios.get(
          baseUrl + `/pastes/${selectedId}/comments`
        );
        setAllComments(response.data);
      };
      getComments();
    } catch (err) {
      console.error(err);
    }
  }, [selectedId]);

  const handleDeletePaste = async () => {
    try {
      await axios.delete(baseUrl + `/pastes/${selectedId}`);
      setSelectedId(null);
      const response = await axios.get(baseUrl + "/pastes/");
      setAllPastes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {currentPaste !== null && (
        <div>
          <button onClick={() => setSelectedId(null)}>X</button>
          <h3>{currentPaste.title} </h3>
          <button onClick={() => handleDeletePaste()}>Delete Paste</button>
          <p>{currentPaste.content}</p>
          <div>{dateFormat(currentPaste.date)}</div>
          {!writeComment && (
            <button
              className="comment-button"
              onClick={() => setWriteComment(true)}
            >
              Add a comment
            </button>
          )}
          {writeComment && (
            <CommentPosting
              pasteId={selectedId}
              setWriteComment={setWriteComment}
              setAllComments={setAllComments}
            />
          )}

          {!writeComment && allComments.length > 0 && (
            <div>
              {" "}
              <h4>Comments: </h4>{" "}
              {allComments.map((el) => (
                <SingleComment
                  key={el.id}
                  comment={el}
                  setAllComments={setAllComments}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
