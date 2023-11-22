import userEvent from "@testing-library/user-event";
import {
  act,
  findByText,
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor
} from "../../test-utils-default";
import { myitem } from "../../types/myitem";
import ExpandableMenu from "../../layout/expandable-menu";

describe("ExpandableMenu", () => {
  const items: myitem[] = [
    {
      id: "1",
      text: "Item 1",
      to: "/path1",
      disabled: false
    },
    {
      id: "2",
      text: "Item 2",
      icon: "Icon 2",
      subMenu: [
        {
          text: "Subitem 1",
          icon: "Icon 3",
          path: "/path2",
          disabled: true
        }
      ],
      to: "#",
      disabled: false
    }
  ];

  it("should render the menu items", () => {
    render(<ExpandableMenu isOpen items={items} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
