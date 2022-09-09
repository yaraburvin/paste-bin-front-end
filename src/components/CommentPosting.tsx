import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../App";

interface ICommentPost {
  pasteId: number;
  setOpenCommentPosting: React.Dispatch<React.SetStateAction<boolean>>;
  updateAllComments: number;
  setUpdateAllComments: React.Dispatch<React.SetStateAction<number>>;
}
export function CommentPosting({
  pasteId,
  setOpenCommentPosting,
  updateAllComments,
  setUpdateAllComments,
}: ICommentPost): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(baseUrl + `/pastes/${pasteId}/comments`, {
        username: username,
        comment: comment,
      });
      setUpdateAllComments(updateAllComments + 1);
      setUsername("");
      setComment("");
      setOpenCommentPosting(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        className="comment-textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here"
        rows={14}
      >
        {" "}
      </textarea>
      <button onClick={() => handleSubmit()}>Submit</button>
      <button onClick={() => setOpenCommentPosting(false)}>close</button>
    </div>
  );
}
