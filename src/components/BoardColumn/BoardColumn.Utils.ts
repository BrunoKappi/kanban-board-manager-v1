import { BoardType, CardType, TagType } from "@/Data/Types";

export const FilterCards = (Card: CardType, SearchFilter: string, Board: BoardType, TagsToFilter: string[]) => {
  var HasTag = false;
  var TextFitlter = false;
  var CardTitle = false;
  var CardDesc = false;
  var CardTags = false;

  if (!SearchFilter) {
    TextFitlter = true;
  } else {
    CardTitle = Card?.CardTitle.toLowerCase().includes(SearchFilter.toLowerCase());
    CardDesc = Card?.CardDescription.toLowerCase().includes(SearchFilter.toLowerCase());

    if (Card?.Tags?.length > 0) {
      Card.Tags.map((CardTag) => {
        let Tag = Board?.Tags?.find((BoardTag: TagType) => BoardTag.TagId === CardTag);
        if (Tag) {
          if (Tag?.TagName.toLowerCase().includes(SearchFilter.toLowerCase())) {
            CardTags = true;
          }
        }
      });
    } else {
      CardTags = false;
    }

    TextFitlter = CardTitle || CardDesc || CardTags;
  }

  //TAG FILTER
  if (Card?.Tags?.length > 0) {
    if (TagsToFilter.length > 0) {
      TagsToFilter?.forEach((TagToFilter: string) => {
        if (Card?.Tags?.indexOf(TagToFilter) !== -1) {
          HasTag = true;
        }
      });
    } else {
      HasTag = true;
    }
  } else {
    if (TagsToFilter.length > 0) {
      HasTag = false;
    } else {
      HasTag = true;
    }
  }

  return HasTag && TextFitlter;
};
