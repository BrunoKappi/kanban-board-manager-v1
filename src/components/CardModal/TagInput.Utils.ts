import { SetCardModalCardTags } from "@/Config/Store/CardModal/CardModal";
import store from "@/Config/Store/Store";
import { TagType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleCardTagToggle = (BorardTag: TagType) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;

  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };
  //@ts-ignore
  const CurrentCardTags: string[] = [...(store.getState().CardModal?.Card?.Tags || [])];

  var NewCardTags = [...CurrentCardTags];

  console.log(NewCards);

  const Contain = NewCardTags.includes(BorardTag.TagId);

  if (!Contain) {
    NewCardTags = [...NewCardTags, BorardTag.TagId];
  } else {
    NewCardTags = [...NewCardTags].filter((TagId: string) => TagId !== BorardTag.TagId);
  }

  NewCard.Tags = [...NewCardTags];

  NewCards = [...NewCards].map((Card: any) => (Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard }));

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  //@ts-ignore
  store.dispatch(SetCardModalCardTags(NewCardTags));

  MIDDLEWARE_UpdateBoard(NewBoard);
};
