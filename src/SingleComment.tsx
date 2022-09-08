import axios from "axios";
import { baseUrl } from "./App";
import { IComment } from "./utils/types";

interface ISingleComment {
  comment: IComment;
  setAllComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

export function SingleComment({
  comment,
  setAllComments,
}: ISingleComment): JSX.Element {
  const handleDeleteButton = () => {
    try {
      const deleteComment = async () => {
        await axios.delete(
          baseUrl + `/pastes/${comment.paste_id}/comments/${comment.id}`
        );
      };
      const getComment = async () => {
        const response = await axios.get(
          baseUrl + `/pastes/${comment.paste_id}/comments`
        );

        setAllComments(response.data[0]);
      };
      getComment();
      deleteComment();
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
