import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Columns2 } from "lucide-react";
import { useState } from "react";
import { PopOverList } from "../PopOverList/PopOverList";
import Tooltip from "../Tooltip/Tooltip";
import { ListOption } from "../ListOption/ListOption";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import Show from "@/lib/Show";
import { CardSizes } from "@/Data/Sizes";
import { DefaultNewUserPreference } from "@/Config/Store/UserPreferences/UserPreferences";
import { MIDDLEWARE_UpdateUserPreferences } from "@/Middleware/UserPreferences";
import { STORE_GET, STORE_SetCardWidth } from "@/Middleware/Store";
import { LOCALSTORAGE_SetItem } from "@/Middleware/LocalStorage";

type ColumnSizePopoverProps = {
  Mode?: string;
};

export default function ColumnSizePopover({ Mode = "Default" }: ColumnSizePopoverProps) {
  const [open, setOpen] = useState(false);
  const CardWidth = useSelector((state: any) => state.CardWidth);
  const Translations = useSelector((state: any) => state.Translations);
  const Language = useSelector((state: any) => state.Language);

  const HandleSetCardWidth = (Width: string) => {
    LOCALSTORAGE_SetItem("Kanban-CardWidth", Width);

    STORE_SetCardWidth(Width);

    const UserPreferences = { ...STORE_GET("UserPreferences") } || { ...DefaultNewUserPreference };

    UserPreferences.CardWidth = Width;

    if (UserPreferences.docID) {
      MIDDLEWARE_UpdateUserPreferences(UserPreferences);
    }
  };

  const GetSide = () => {
    if (Mode === "Default") {
      return "bottom";
    } else {
      if (window.innerWidth > 768) {
        return "right";
      } else {
        return "bottom";
      }
    }
  };

  //@ts-ignore
  const CardSizesTranslated = CardSizes[Language] || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Show if={Mode === "Default"}>
          <Tooltip text={Translations.Tooltips.CardWidth}>
            <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
              <Columns2 />
            </Button>
          </Tooltip>
        </Show>
        <Show if={Mode === "List"}>
          <ListOption className="w-full bg-red flex-grow">
            <Columns2 className="size-4" />
            {Translations.OptionsLists.CardWidth}
          </ListOption>
        </Show>
      </PopoverTrigger>
      <PopoverContent side={`${GetSide()}`} className="w-56 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="gap-0 py-0">
          <ListOption className="flex flex-row justify-center mb-2 cursor-default hover:bg-transparent">
            <span> {Translations.PopoversSubtitles.CardWidth}</span>
          </ListOption>
          {CardSizesTranslated.map((CardSize: any) => {
            return (
              <ListOption onClick={() => HandleSetCardWidth(CardSize.Size)}>
                <Check className={`size-5 ${CardWidth === CardSize.Size ? " opacity-100" : " opacity-0"}`} />
                {CardSize.Name}
              </ListOption>
            );
          })}
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
