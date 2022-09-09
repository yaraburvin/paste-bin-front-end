import { dateFormat } from "../utils/dateFormat";
import { IPaste } from "../utils/interfaces";

interface Iprops {
  element: IPaste;
}
export function SinglePaste({ element }: Iprops): JSX.Element {
  return (
    <div className="singlePaste">
      <div className="date">{dateFormat(element.date)}</div>
      <h3>{element.title} </h3>
      <p>{element.content}</p>
    </div>
  );
}
