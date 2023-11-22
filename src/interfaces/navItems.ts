import { myitem } from "../types/myitem";
import { navItemState } from "../types/navItemState";

export interface navItems {
  path: string;
  text: string;
  icon: string;
  disabled?: boolean;
  expandableMenuItems?: Array<myitem>;
  state?: navItemState;
  open?: boolean;
}
