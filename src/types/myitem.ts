import { navItems } from "../interfaces";
import { navItemState } from "./navItemState";

export type myitem = {
  id: string;
  to: string;
  text: string;
  icon?: string;
  disabled?: boolean;
  subMenu?: Array<navItems>;
  state?: navItemState;
};
