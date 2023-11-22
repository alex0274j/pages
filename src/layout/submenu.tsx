/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { myitem } from "../types/myitem";
import ExpandableMenu from "./expandable-menu";

// @ todo: add signatures to a global one or in a specific directory

type expandableMenuElement = {
  name: string;
  openState: boolean;
  disabled?: boolean;
};

type State = {
  db?: {
    [key: string]: {
      expandableMenuOpen: boolean;
      children: Array<myitem>;
    };
  };
  expandableMenuElements: Array<expandableMenuElement>;
};

type Props = {
  navElements: Array<navItems>;
  title: string;
  onClick?: (event: SyntheticEvent) => void;
  parentTitle?: string;
};

export interface navItems {
  path: string;
  text: string;
  icon: string;
  disabled?: boolean;
  expandableMenuItems?: Array<myitem>;
}

function closeMenu(): void {
  const { innerWidth: width } = window;
  if (width <= 575) {
    setTimeout(() => {
      const menu = document.getElementsByClassName("main-nav")[0];
      document.getElementsByClassName("hmi-btn-menu")[0].classList.toggle("clicked");
      menu.classList.toggle("hidden");
    }, 250);
  }
}

export default class SubMenu extends React.Component<Props, State> {
  navElements: navItems[];

  constructor(props: Props) {
    super(props);

    const { navElements } = props;
    this.navElements = navElements;

    const expandableMenuElements: Array<expandableMenuElement> = [];

    for (const item of navElements) {
      if ("expandableMenuItems" in item) {
        expandableMenuElements.push({
          name: item.text,
          openState: false,
          disabled: item.disabled
        });
      }
    }

    this.state = {
      expandableMenuElements
    };
  }

  // eslint-disable-next-line class-methods-use-this
  handleExpandableMenu(elementName: string): void {
    const { expandableMenuElements } = this.state;

    this.toggleExpandableMenuState("");

    expandableMenuElements.map((item) => {
      // eslint-disable-next-line no-param-reassign
      item.openState =
        item.openState && item.name === elementName ? false : item.name === elementName;

      return item;
    });

    this.setState({ expandableMenuElements });
  }

  toggleExpandableMenuState(dbname: string | number): void {
    const { db } = this.state;

    // Close / open Expandlemenu mechanism

    if (db) {
      const keys = Object.keys(db);
      for (const key of keys) {
        if (key === dbname && db[key].expandableMenuOpen) {
          db[key].expandableMenuOpen = false;
        } else {
          db[key].expandableMenuOpen = key === dbname;
        }
      }
    }
  }

  render(): JSX.Element {
    const { expandableMenuElements } = this.state;
    const { title, onClick, parentTitle } = this.props;

    return (
      <div
        className={parentTitle ? "col-2 main-nav sub-menu" : "col-2 main-nav"}
        id="navbarCollapse"
      >
        <ul className="nav flex-column">
          <li className="nav-head">
            <Link className="nav-link" to="#" onClick={onClick}>
              <span className="icon icon-arrow-back me-1" />
              {parentTitle !== undefined ? parentTitle : "Main menu"}
            </Link>
          </li>
          <li className="nav-head-title no-hover">
            <span className="menu-header">{title}</span>
          </li>

          {/* Generate the navigation */}
          {this.navElements.map((navElement, i) => {
            const expandableMenuExist = "expandableMenuItems" in navElement;
            const iconDirection =
              expandableMenuExist &&
              expandableMenuElements.find((item) => item.name === navElement.text)
                ?.openState
                ? "up"
                : "down";

            const generatedLink = (
              <li
                key={navElement.text + i}
                className={`nav-item ${navElement.disabled ? "disabled" : ""}`}
              >
                <Link
                  aria-current="page"
                  className="nav-link with-icon"
                  to={navElement.path}
                  role="button"
                  onClick={(): void => {
                    if (expandableMenuExist) {
                      this.handleExpandableMenu(navElement.text);
                    } else {
                      closeMenu();
                    }
                  }}
                >
                  <span className={`icon icon-${navElement.icon} me-1 ml--4px`} />{" "}
                  {navElement.text}
                  {expandableMenuExist && (
                    <span className={`icon icon-${iconDirection} align-right`} />
                  )}
                </Link>
                {expandableMenuExist && navElement.expandableMenuItems && (
                  <ExpandableMenu
                    isOpen={iconDirection === "up"}
                    items={navElement.expandableMenuItems}
                  />
                )}
              </li>
            );

            return generatedLink;
          })}
        </ul>
      </div>
    );
  }
}
