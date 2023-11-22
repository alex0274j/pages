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
import Submenu, { navItems } from "../../layout/submenu";

describe("Submenu", () => {
  const navElements: navItems[] = [
    {
      path: "/path1",
      text: "Text 1",
      icon: "Icon 1",
      disabled: false,
      expandableMenuItems: [
        { id: "1", to: "../path1", text: "Item 1" },
        { id: "2", to: "../path3", text: "Item 2" }
      ]
    },
    {
      path: "/path2",
      text: "Text 2",
      icon: "Icon 2",
      disabled: true
    }
  ];

  it("should render the title and nav elements", () => {
    render(<Submenu navElements={navElements} title="Title" />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Text 1")).toBeInTheDocument();
    expect(screen.getByText("Text 2")).toBeInTheDocument();
  });

  it("should render expandable menu items when clicked", () => {
    render(<Submenu navElements={navElements} title="Title" />);

    const expandableMenuButton = screen.getByText("Text 1");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(expandableMenuButton);
    });

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("should not render expandable menu items when disabled", () => {
    navElements[0].disabled = true;
    render(<Submenu navElements={navElements} title="Title" />);

    // eslint-disable-next-line testing-library/no-node-access
    const element = screen.queryByText("Text 1")?.parentElement;
    expect(element?.classList.contains("disabled")).toBeTruthy();
  });
});
