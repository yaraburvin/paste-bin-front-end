export interface IPaste {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface IComment {
  id: number;
  username: string;
  comment: string;
  paste_id: number;
}
