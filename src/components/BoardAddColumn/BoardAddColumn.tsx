import { useSelector } from "react-redux";
import { AddColumn } from "./BoardAddColumn.Utils";

type Props = {
  Column?: any;
};

export default function BoardAddColumn({}: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  return (
    <div className={`flex text-sm flex-row justify-center  flex-shrink-0 items-center gap-4 w-66  px-5 py-4 rounded-xl bg-slate-400/10 hover:bg-slate-400/20 dark:bg-slate-400/5 dark:hover:bg-slate-400/20 mr-2 cursor-pointer truncate`} onClick={AddColumn}>
      {Translations.Buttons.AddColumn}
    </div>
  );
}
