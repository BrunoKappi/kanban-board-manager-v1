import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { UserCheck2, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { FIREBASE_Logout, FIREBASE_RegisterUserEmailPassword } from "@/Config/Firebase/Auth";
import { BoardListItemType } from "@/Data/Types";
import moment from "moment";
import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList } from "@/Config/Firebase/Firestore";
import { DefaultBoardList } from "@/Data/BoardList";

import { ExampleBoard } from "@/Data/ExampleBoard";

export default function ToggleLogin({ className }: any) {
  const User = useSelector((state: any) => state.User);
  const BoardList = useSelector((state: any) => state.BoardList);

  const ToggleLogin = () => {
    if (User.uid) {
      localStorage.clear();
      FIREBASE_Logout();
    } else {
      FIREBASE_RegisterUserEmailPassword("teste@bkappi.com", "123456")
        .then((Data) => {
          const UserUid = Data.user.uid;
          if (localStorage.getItem(`Kanban-BoardList`)) {
            BoardList.map((BoardListItem: BoardListItemType) => {
              var NewBoardListItem: BoardListItemType = { ...BoardListItem, LastEditedAt: moment().valueOf(), OwnerUid: UserUid };
              FIREBASE_CreateBoardList(NewBoardListItem);

              if (localStorage.getItem(`Kanban-Board-${BoardListItem.BoardId}`)) {
                var NewBoard = { ...JSON.parse(localStorage.getItem(`Kanban-Board-${BoardListItem.BoardId}`) || ""), LastEditedAt: moment().valueOf(), OwnerUid: UserUid };
                FIREBASE_CreateBoard(NewBoard);
              }
            });
          } else {
            var NewBoardListItem: BoardListItemType = { ...DefaultBoardList[0], LastEditedAt: moment().valueOf(), OwnerUid: UserUid };
            var NewBoard = { ...ExampleBoard, LastEditedAt: moment().valueOf(), OwnerUid: UserUid };
            FIREBASE_CreateBoard(NewBoard);
            FIREBASE_CreateBoardList(NewBoardListItem);
          }
        })
        .catch(() => {});
    }
  };

  return (
    <Button onClick={ToggleLogin} className={cn("", className)} variant="ghost" size="icon">
      {User.uid ? <UserCheck2 /> : <UserX />}
    </Button>
  );
}
