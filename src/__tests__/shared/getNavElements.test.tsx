import { navItems } from "../../interfaces";
import getNavElements, { disableNavElements } from "../../shared/getNavElements";

// @ TODO: Fix tests and check how to test role based access

describe("getNavElements", () => {
  const navElements: Array<navItems> = [
    {
      text: "Item 1",
      disabled: false,
      expandableMenuItems: [
        {
          text: "Subitem 1",
          disabled: false,
          subMenu: [
            {
              text: "Sub-subitem 1",
              disabled: false,
              icon: "Icon 3",
              path: "/path2"
            }
          ]
        }
      ]
    },
    {
      id: 1,
      to: "/path1",
      text: "Item 3",
      disabled: false,
      subMenu: [
        {
          text: "Subitem 1",
          disabled: false,
          icon: "Icon 1",
          path: "/path2"
        }
      ]
    },
    {
      id: 3,
      to: "/path21",
      text: "Item 23",
      disabled: false
    }
  ];

  const rights: { [key: string]: string[] } = { "Sub-subitem 1": ["service"] };

  it("should disable sub-submenu items based on role", async () => {
    const role = "service";
    const result = await getNavElements(role, navElements, rights);

    expect(result[0]?.expandableMenuItems[0]?.subMenu[0]?.disabled).toBe(false);
  });
});
