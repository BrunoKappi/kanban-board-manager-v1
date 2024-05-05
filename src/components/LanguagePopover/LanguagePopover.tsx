import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Languages as LanguageIcon } from "lucide-react";
import { useState } from "react";
import { PopOverList } from "../PopOverList/PopOverList";
import { ListOption } from "../ListOption/ListOption";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import store from "@/Config/Store/Store";
import { DefaultNewUserPreference } from "@/Config/Store/UserPreferences/UserPreferences";
import { FIREBASE_UpdateUserPreferences } from "@/Config/Firebase/Firestore";
import { Languages } from "@/Data/Languages";
import { SetLanguage } from "@/Config/Store/Language/Language";
import { SetTranslations } from "@/Config/Store/Translations/Translations";
import { TRANSLATIONS_ENGLISH } from "@/Data/Translations_English";
import { TRANSLATIONS_PORTUGUESE } from "@/Data/Translations_PortugueseBr";
import { ChangeExampleBoardLanguage } from "./LanguagePopover.Utils";
import { TRANSLATIONS_SPANISH } from "@/Data/Translations_Espanish";
import { TRANSLATIONS_FRENCH } from "@/Data/Translations_French";
import { TRANSLATIONS_GERMAN } from "@/Data/Translations_German";

type Props = {
  Mode?: string;
};

export default function LanguagePopover({ Mode = "Default" }: Props) {
  const [open, setOpen] = useState(false);
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);

  const Language = useSelector((state: any) => state.Language);

  const dispatch = useDispatch();

  const HandleSetLanguage = (Value: string) => {
    if (Language === Value) return;
    ChangeExampleBoardLanguage(Value);

    localStorage.setItem("Kanban-Language", Value);
    dispatch(SetLanguage(Value));

    if (Value === "English") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_ENGLISH));
    } else if (Value === "Portuguese-br") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_PORTUGUESE));
    } else if (Value === "Spanish") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_SPANISH));
    } else if (Value === "French") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_FRENCH));
    } else if (Value === "German") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_GERMAN));
    }

    const UserPreferences = { ...store.getState().UserPreferences } || { ...DefaultNewUserPreference };

    UserPreferences.Language = Value;

    if (UserPreferences.docID) {
      FIREBASE_UpdateUserPreferences(UserPreferences);
    }
  };

  //@ts-ignore
  const LanguagesTranslated = Languages[Language] || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onClick={() => setOpen(true)}>
        <ListOption className="w-full bg-red flex-grow" autoFocus={false}>
          <LanguageIcon className="size-5" />
          {Translations.PopoverTitle.Languages}
        </ListOption>
      </PopoverTrigger>
      <PopoverContent side={`bottom`} className="w-56 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="gap-0 py-0">
          <ListOption className="flex flex-row justify-center mb-2 cursor-default hover:bg-transparent">{Translations.PopoversSubtitles.Languages}</ListOption>
          {LanguagesTranslated.map((CardSize: any) => {
            return (
              <ListOption onClick={() => HandleSetLanguage(CardSize.Value)}>
                <Check className={`size-5 ${Language === CardSize.Value ? " opacity-100" : " opacity-0"}`} />
                {CardSize.Name}
              </ListOption>
            );
          })}
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
