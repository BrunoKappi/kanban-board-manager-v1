export type TaskType = {
  TaskId: string;
  TaskTitle: string;
  Completed: boolean;
  CreatedAt: string;
  LastEditedAt: string;
};

export type CardType = {
  CardId: string;
  CardTitle: string;
  CardDescription: string;
  CreatedAt: number;
  LastEditedAt: number;
  TasksQtd: number;
  Tasks: TaskType[];
  Tags: string[];
};

export type CollaboratorType = {
  Email: string;
  Uid: string;
};

export type ColumnType = {
  ColumId: string;
  ColumnTitle: string;
  ColumnColor: string;
  CreatedAt: number;
  LastEditedAt: number;
  Visible: boolean;
  CardsQtd: number;
  Cards: CardType[];
};

export type BoardType = {
  BoardId: string;
  BoardName: string;
  BoardColumnsQtd: number;
  Description: string;
  CreatedAt: string;
  LastEditedAt: number;
  Public: boolean;
  OwnerUid: string;
  docID: string;
  ColorColumns: boolean;
  Columns: ColumnType[];
  Collaborators: CollaboratorType[];
  Shared: boolean;
  PublicURL: string;
  PuclicEdit: boolean;
  AllowDuplicate: boolean;
  Tags: TagType[];
};

export type TagType = {
  TagId: string;
  TagName: string;
  TagColor: string;
};

export type BoardListItemType = {
  BoardName: string;
  BoardId: string;
  OwnerUid: string;
  docID: string;
  LastEditedAt: number;
  IsBoardShared: boolean;
  BoardListGroupId: string;
};
