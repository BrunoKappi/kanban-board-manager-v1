import * as React from "react";
import { format } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import moment from "moment";
import { es } from "date-fns/locale";
import { ptBR } from "date-fns/locale";
import { fr } from "date-fns/locale";
import { de } from "date-fns/locale";
import { enUS } from "date-fns/locale";
import { useSelector } from "react-redux";

type DatePickerProps = {
  DateTime: number;
  Text: string;
  onSelect: (Unix: number) => void;
};

export function DatePicker({ DateTime = 0, Text = "Selecione uma data", onSelect }: DatePickerProps) {
  const Language = useSelector((state: any) => state.Language);

  const [date, setDate] = React.useState<Date>(moment.unix(DateTime).toDate());
  const [Unix, setUnix] = React.useState(DateTime);
  const [LOCALE, setLOCALE] = React.useState(enUS);
  const [TimeFormat, setTimeFormat] = React.useState("dd/MM/yyyy");

  React.useEffect(() => {
    if (Language === "Spanish") {
      setLOCALE(es);
      setTimeFormat("dd/MM/yyyy");
    }
    if (Language === "English") {
      setLOCALE(enUS);
      setTimeFormat("MM/dd/yyyy");
    }
    if (Language === "Portuguese-br") {
      setLOCALE(ptBR);
      setTimeFormat("dd/MM/yyyy");
    }
    if (Language === "German") {
      setLOCALE(de);
      setTimeFormat("dd.MM.yyyy");
    }
    if (Language === "French") {
      setLOCALE(fr);
      setTimeFormat("dd/MM/yyyy");
    }
  }, [Language]);

  const OnSelectDate = (DateSelected: any) => {
    if (!DateSelected) return;
    onSelect(moment(DateSelected).unix());
    setUnix(moment(DateSelected).unix());
    setDate(DateSelected);
  };

  const ResetDate = () => {
    onSelect(0);
    setUnix(0);
    //@ts-ignore
    setDate(null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="flex-grow w-full text-sm justify-between bg-transparent border">
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {date && Unix > 0 ? format(date, TimeFormat) : <span className="text-sm tex-pri">{Text}</span>}
          {Unix > 0 && <X className="size-4" onClick={ResetDate} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={OnSelectDate} initialFocus locale={LOCALE} />
      </PopoverContent>
    </Popover>
  );
}
