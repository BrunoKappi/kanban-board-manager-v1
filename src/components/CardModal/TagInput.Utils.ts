import { SetCardModalCardTags } from "@/Config/Store/CardModal/CardModal";
import store from "@/Config/Store/Store";
import { TagType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleCardTagToggle = (BorardTag: TagType) => {
  const ColumIndex: number = store.getState().CardModal.ColumnIndex;

  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...store.getState().CardModal.Card };
  //@ts-ignore
  const CurrentCardTags: string[] = [...(store.getState().CardModal?.Card?.Tags || [])];

  var NewCardTags = [...CurrentCardTags];

  const Contain = NewCardTags.includes(BorardTag.TagId);

  if (!Contain) {
    NewCardTags = [...NewCardTags, BorardTag.TagId];
  } else {
    NewCardTags = [...NewCardTags].filter((TagId: string) => TagId !== BorardTag.TagId);
  }

  NewCard.Tags = [...NewCardTags];

  NewCards = NewCards.map((Card: any) => (Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard }));

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  //@ts-ignore
  store.dispatch(SetCardModalCardTags(NewCardTags));

  console.log(NewCardTags);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
