import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import store from "@/Config/Store/Store";
import { DefaultBoardList } from "@/Data/BoardList";
import { ExampleBoard, ExampleBoardID, GetText } from "@/Data/ExampleBoard";
import { BoardType } from "@/Data/Types";
import { Copy } from "@/lib/utils";

export const ChangeExampleBoardLanguage = (Language: string) => {
  const CurrentlBoardList = Copy(store.getState().BoardList);
  const CurrentlBoard = Copy(store.getState().Board);

  var OriginalBoard: BoardType = Copy(ExampleBoard);
  var NewBoard = { ...GetText(Language) };
  var BoardListIndex = 0;
  CurrentlBoardList?.forEach((BoardListItem: any, Index: number) => {
    if (BoardListItem.BoardId === ExampleBoardID) BoardListIndex = Index;
  });

  var Changed = false;

  if (!OriginalBoard?.Columns?.length) return;

  if (OriginalBoard.Columns?.length !== CurrentlBoard.Columns?.length) {
    Changed = true;
  }

  if (CurrentlBoard.BoardName)
    for (let i = 0; i < OriginalBoard.Columns?.length; i++) {
      if (OriginalBoard.Columns[i] && CurrentlBoard.Columns[i]) {
        if (OriginalBoard.Columns[i].Cards?.length !== CurrentlBoard.Columns[i].Cards?.length) Changed = true;
      } else {
        return;
      }

      for (let j = 0; j < OriginalBoard.Columns[i].Cards?.length; j++) {
        if (!!OriginalBoard.Columns[i].Cards[j] && CurrentlBoard.Columns[i].Cards[j])
          if (OriginalBoard.Columns[i].Cards[j].Tasks?.length !== CurrentlBoard.Columns[i].Cards[j].Tasks?.length) {
            Changed = true;
          }
      }
    }

  if (Changed) return;

  const SameBoard = OriginalBoard.BoardId === CurrentlBoard.BoardId;

  for (let i = 0; i < OriginalBoard.Columns?.length; i++) {
    //@ts-ignore
    OriginalBoard.Columns[i].ColumnTitle = NewBoard.Columns[`Column${i + 1}`].Title;

    for (let j = 0; j < OriginalBoard.Columns[i].Cards?.length; j++) {
      //@ts-ignore
      OriginalBoard.Columns[i].Cards[j].CardTitle = NewBoard.Columns[`Column${i + 1}`].Cards[`Card${j + 1}`].Title;

      for (let k = 0; k < OriginalBoard.Columns[i].Cards[j].Tasks?.length; k++) {
        if (!!OriginalBoard.Columns[i].Cards[j].Tasks[k]) {
          //@ts-ignore
          OriginalBoard.Columns[i].Cards[j].Tasks[k].TaskTitle = NewBoard.Columns[`Column${i + 1}`].Cards[`Card${j + 1}`].Tasks[`Task${k + 1}`];
        }
      }
    }
  }

  OriginalBoard.Tags.map((Tag) => {
    //@ts-ignore
    Tag.TagName = NewBoard.Tags[Tag.TagId];
  });

  OriginalBoard.BoardName = NewBoard.Board?.Name;
  OriginalBoard.Description = NewBoard.Board?.Description;

  var NewBoardListItem = {
    ...DefaultBoardList[0],
    BoardId: OriginalBoard.BoardId,
    BoardName: OriginalBoard.BoardName,
  };

  CurrentlBoardList[BoardListIndex] = { ...NewBoardListItem };

  localStorage.setItem(`Kanban-Board-${OriginalBoard.BoardId}`, JSON.stringify(OriginalBoard));
  localStorage.setItem(`Kanban-BoardListItem-${OriginalBoard.BoardId}`, JSON.stringify(NewBoardListItem));
  localStorage.setItem(`Kanban-BoardList`, JSON.stringify([...CurrentlBoardList]));

  store.dispatch(SetBoardList([...CurrentlBoardList]));

  if (SameBoard) {
    //@ts-ignore
    store.dispatch(SetBoard(OriginalBoard));
    //@ts-ignore
    store.dispatch(SetSelectedBoard(NewBoardListItem.BoardId));
  }
};
