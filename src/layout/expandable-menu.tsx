/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../interfaces";
import { myitem } from "../types/myitem";
import useWindowDimensions from "../shared/windowDimensions";

type submenuProps = {
  isOpen: boolean;
  items: Array<myitem>;
  onClick?: (
    event: SyntheticEvent,
    title: string,
    submenu: navItems[] | undefined,
    parentTitle?: string
  ) => void;
  parentTitle?: string;
};

/**
 * The ExpandableMenu function is a reusable component that displays a menu with expandable items.
 * It takes in an array of menu items as a prop and maps over them to create the menu items.
 * Each menu item can have a sub-menu, which is displayed when the user clicks on the item.
 * The component uses React state to keep track of which items are expanded.
 * When an item is expanded, the component sets the corresponding state to true and displays the sub-menu.
 * When an item is collapsed, the component sets the corresponding state to false and hides the sub-menu.
 * The component also provides a callback function that is called when a menu item is clicked.
 * This allows the parent component to handle the click event and perform any necessary actions.
 */
const ExpandableMenu = (props: submenuProps): JSX.Element | null => {
  const { width } = useWindowDimensions();
  const { isOpen, items, onClick, parentTitle } = props;
  const submenuItems = items.map((item) => {
    const subMenuExist = "subMenu" in item;

    if (!item.icon) {
      if (subMenuExist && onClick !== undefined) {
        return (
          <li key={item.id} className={`nav-item ${item.disabled ? "disabled" : ""}`}>
            <Link
              className="nav-link with-icon"
              onClick={(e): void => onClick(e, item.text, item.subMenu, parentTitle)}
              to="#"
            >
              {" "}
              {item.text}
              <span className="icon icon-arrow-next align-right" />
            </Link>
          </li>
        );
      }

      return (
        <li key={item.id} className={`nav-item ${item.disabled ? "disabled" : ""}`}>
          <Link
            className="nav-link"
            onClick={closeMenu}
            to={item.to}
            state={{ name: item.text, pageInfo: item.state }}
          >
            {" "}
            {item.text}
          </Link>
        </li>
      );
    }
    return (
      <li key={item.id} className="nav-item">
        <Link className="nav-link with-icon" to={item.to}>
          {" "}
          {item.text}
          <span className={`icon ${item.icon} align-right`} />
        </Link>
      </li>
    );
  });

  let cssHidden = "";
  if (!isOpen) {
    cssHidden = "hidden";
  }

  function closeMenu(): void {
    if (width <= 575) {
      setTimeout(() => {
        const menu = document.getElementsByClassName("main-nav")[0];
        document.getElementsByClassName("hmi-btn-menu")[0].classList.toggle("clicked");
        menu.classList.toggle("hidden");
      }, 250);
    }
  }

  return <ul className={`nav flex-column submenu ${cssHidden}`}>{submenuItems}</ul>;
};

ExpandableMenu.defaultProps = {
  onClick: null,
  parentTitle: undefined
};

export default ExpandableMenu;
