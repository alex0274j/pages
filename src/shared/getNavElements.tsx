import { navItems } from "../interfaces";
import navElements from "./navElements";
import { myitem } from "../types/myitem";

const presetRights: { [key: string]: string[] } = {
  // Operating: ["administrator", "service"],
};

async function getNavElements(
  username: string,
  custNavElements?: Array<navItems>,
  rights?: { [key: string]: string[] }
): Promise<Array<navItems>> {
  return disableNavElements(custNavElements ?? navElements, username, rights);
}

export function disableNavElements(
  navigatonItems: Array<navItems>,
  role: string,
  settedRights?: { [key: string]: string[] }
): Array<navItems> {
  const rights = settedRights ?? presetRights;
  const editedNavElements = navigatonItems.map((element: navItems): navItems => {
    if (element.expandableMenuItems) {
      // eslint-disable-next-line no-param-reassign
      element.expandableMenuItems = element.expandableMenuItems.map((item): myitem => {
        if (item.subMenu) {
          // eslint-disable-next-line no-param-reassign
          item.subMenu = item.subMenu.map((item2): navItems => {
            if (rights[`${item2.text}`]) {
              let setDisable = true;

              for (let i = 0; i < rights[`${item2.text}`].length; i += 1) {
                if (role === rights[`${item2.text}`][i]) {
                  // disable items in sub-sub menu
                  if (item2.expandableMenuItems) {
                    for (let j = 0; j < item2.expandableMenuItems.length; j += 1) {
                      if (rights[item2.expandableMenuItems[j].text]) {
                        // eslint-disable-next-line no-param-reassign
                        item2.expandableMenuItems[j].disabled = true;
                        if (role === rights[item2.expandableMenuItems[j].text][i]) {
                          // eslint-disable-next-line no-param-reassign
                          item2.expandableMenuItems[j].disabled = false;
                        }
                      }
                    }
                  }

                  setDisable = false;

                  break;
                }
              }
              if (setDisable) {
                return {
                  ...item2,
                  disabled: true
                };
              }
            }
            return {
              ...item2,
              disabled: false
            };
          });
        }

        if (rights[`${item.text}`]) {
          let setDisable = true;
          for (let i = 0; i < rights[`${item.text}`].length; i += 1) {
            if (role === rights[`${item.text}`][i]) {
              setDisable = false;
              break;
            }
          }
          if (setDisable) {
            return {
              ...item,
              disabled: true
            };
          }
        }
        return {
          ...item
        };
      });
    }

    if (rights[`${element.text}`]) {
      let setDisable = true;
      for (let i = 0; i < rights[`${element.text}`].length; i += 1) {
        if (role === rights[`${element.text}`][i]) {
          setDisable = false;
          break;
        }
      }
      if (setDisable) {
        return {
          ...element,
          disabled: true
        };
      }
    }

    return {
      ...element
    };
  });
  return editedNavElements;
}
export default getNavElements;
