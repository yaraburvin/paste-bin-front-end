import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./App";
import { IComment } from "./utils/types";

interface ICommentPost {
  pasteId: number;
  setAllComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  setWriteComment: React.Dispatch<React.SetStateAction<boolean>>;
}
export function CommentPosting({
  pasteId,
  setAllComments,
  setWriteComment,
}: ICommentPost): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [comment, setComment] = useState("");
  const RerenderWithUpdate = () => {
    try {
      const getComments = async () => {
        const response = await axios.get(
          baseUrl + `/pastes/${pasteId}/comments`
        );
        setAllComments(response.data);
      };
      getComments();
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        baseUrl + `/pastes/${pasteId}/comments`,
        {
          username: username,
          comment: comment,
        }
      );
      console.log(response);
      RerenderWithUpdate();
      setUsername("");
      setComment("");
      setWriteComment(false);
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
      <button onClick={() => setWriteComment(false)}>close</button>
    </div>
  );
}
