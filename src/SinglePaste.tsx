import { IPaste } from "./utils/types";
interface Iprops {
  element: IPaste;
}
export function SinglePaste({ element }: Iprops): JSX.Element {
  return (
    <div className="singlePaste">
      <h3>{element.title} </h3>
      <p>{element.content}</p>
      <div>{element.date}</div>
    </div>
  );
}
