import { navItems } from "../interfaces";
import { config } from "./config";

const navElements: Array<navItems> = [
  {
    path: `${config.BASE_URL}/`,
    text: "Home",
    icon: "home"
  },
  {
    path: "/about",
    text: "About",
    icon: "help"
  }
];

export default navElements;
