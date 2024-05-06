import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";

export const ChangeBoardSharingOptions = (ShareBoard: boolean, AllowEdit: boolean, AllowDuplicate: boolean, Collaborators: string[]) => {
  var NewBoard = JSON.parse(JSON.stringify(store.getState().Board));

  NewBoard.Public = ShareBoard;
  NewBoard.PuclicEdit = AllowEdit;
  NewBoard.AllowDuplicate = AllowDuplicate;
  NewBoard.Collaborators = [...Collaborators];
  NewBoard.LastEditedAt = moment().valueOf();
  NewBoard.PublicURL = ShareBoard ? `https://kanban.bkappi.com/view/${NewBoard.BoardId}` : "";


  MIDDLEWARE_UpdateBoard(NewBoard);
};
