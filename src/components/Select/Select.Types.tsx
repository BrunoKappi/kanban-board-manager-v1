export type OptionType = {
  value: string;
  label: string;
};

export type ComboboxDemoProps = {
  Options: OptionType[];
  NotFoundMessage: string;
  SearchMessage: string;
  PlaceholderMessage: string;
  onSelect: (selectedValues: OptionType[]) => void;
  IsMulti?: boolean;
  WithSearch?: boolean;
};
