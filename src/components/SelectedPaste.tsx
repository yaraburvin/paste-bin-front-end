import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { CommentPosting } from "./CommentPosting";
import { SingleComment } from "./SingleComment";
import { dateFormat } from "../utils/dateFormat";
import { IComment, IPaste } from "../utils/interfaces";

interface ISelected {
  selectedPasteId: number;
  setSelectedPasteId: React.Dispatch<React.SetStateAction<number | null>>;
  updateAllPastes: number;
  setUpdateAllPastes: React.Dispatch<React.SetStateAction<number>>;
}

export function SelectedPaste({
  selectedPasteId,
  setSelectedPasteId,
  updateAllPastes,
  setUpdateAllPastes,
}: ISelected): JSX.Element {
  const [currentPaste, setCurrentPaste] = useState<IPaste | null>(null);
  const [updateAllComments, setUpdateAllComments] = useState<number>(0);
  useEffect(() => {
    try {
      const getSelectedPaste = async () => {
        const response = await axios.get(
          baseUrl + `/pastes/${selectedPasteId}`
        );
        setCurrentPaste(response.data[0]);
      };
      getSelectedPaste();
    } catch (err) {
      console.error(err);
    }
  }, [selectedPasteId]);

  const [allComments, setAllComments] = useState<IComment[]>([]);
  const [openCommentPosting, setOpenCommentPosting] = useState<boolean>(false);
  useEffect(() => {
    try {
      const getComments = async () => {
        const response = await axios.get(
          baseUrl + `/pastes/${selectedPasteId}/comments`
        );
        setAllComments(response.data);
      };
      getComments();
    } catch (err) {
      console.error(err);
    }
  }, [selectedPasteId, updateAllComments]);

  const handleDeletePaste = async () => {
    try {
      await axios.delete(baseUrl + `/pastes/${selectedPasteId}`);
      setSelectedPasteId(null);
      setUpdateAllPastes(updateAllPastes + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {currentPaste !== null && (
        <div>
          <button onClick={() => setSelectedPasteId(null)}>X</button>
          <h3>{currentPaste.title} </h3>
          <button onClick={() => handleDeletePaste()}>Delete Paste</button>
          <p>{currentPaste.content}</p>
          <div>{dateFormat(currentPaste.date)}</div>
          {!openCommentPosting && (
            <button
              className="comment-button"
              onClick={() => setOpenCommentPosting(true)}
            >
              Add a comment
            </button>
          )}
          {openCommentPosting && (
            <CommentPosting
              pasteId={selectedPasteId}
              setOpenCommentPosting={setOpenCommentPosting}
              updateAllComments={updateAllComments}
              setUpdateAllComments={setUpdateAllComments}
            />
          )}

          {!openCommentPosting && allComments.length > 0 && (
            <div>
              {" "}
              <h4>Comments: </h4>{" "}
              {allComments.map((el) => (
                <SingleComment
                  key={el.id}
                  comment={el}
                  updateAllComments={updateAllComments}
                  setUpdateAllComments={setUpdateAllComments}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
