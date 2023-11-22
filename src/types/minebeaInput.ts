export type MinebeaInput = {
  children?: React.ReactNode[] | string;
  name?: string;
  float?: "left" | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
  key?: string;
  elements?: any;
  type:
    | "checkbox"
    | "button"
    | "date"
    | "time"
    | "numberctrl"
    | "select"
    | "modal"
    | "textarea"
    | "switch"
    | "radio"
    | "number"
    | "ipv4"
    | "password"
    | "text";
  "label-left"?: string;
  min?: string;
  checked?: boolean;
  readonly?: boolean;
  max?: string;
  defaultValue?: string;
  disabled?: boolean;
  icon?: string;
  value?: string;
  unit?: string;
  variant?: string;
  step?: string;
  bigstep?: string;
  decimals?: string;
  ref?: React.RefObject<HTMLInputElement>;
  id?: string;
  disableSoftValidation?: boolean;
  options?: Array<{
    key: string;
    value: string;
  }>;
  onInput?: (event: React.SyntheticEvent) => void;
  onChange?: (event: React.SyntheticEvent) => void;
  onClick?: (event: React.SyntheticEvent) => void;
};
