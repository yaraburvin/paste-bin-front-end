import axios from "axios";
import { baseUrl } from "../App";
import { IComment } from "../utils/interfaces";

interface ISingleComment {
  comment: IComment;
  updateAllComments: number;
  setUpdateAllComments: React.Dispatch<React.SetStateAction<number>>;
}

export function SingleComment({
  comment,
  updateAllComments,
  setUpdateAllComments,
}: ISingleComment): JSX.Element {
  const handleDeleteButton = async () => {
    try {
      await axios.delete(
        baseUrl + `/pastes/${comment.paste_id}/comments/${comment.id}`
      );
      setUpdateAllComments(updateAllComments + 1);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <p>{comment.username}</p>
      <p>{comment.comment}</p>
      <button onClick={() => handleDeleteButton()}>delete</button>
    </div>
  );
}
