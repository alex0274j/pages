/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { SyntheticEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navItems } from "../interfaces";
import { myitem } from "../types/myitem";
import ExpandableMenu from "./expandable-menu";
import SubMenu from "./submenu";
import getNavElements from "../shared/getNavElements";

// @ todo: add signatures to a global one or in a specific directory

type expandableMenuElement = {
  name: string;
  openState: boolean;
};

type State = {
  db?: {
    [key: string]: {
      expandableMenuOpen: boolean;
      children: Array<myitem>;
    };
  };
  expandableMenuElements?: Array<expandableMenuElement>;
  submenu?: { title: string; menuStructure: navItems[]; parentTitle?: string };
  navElements?: Array<navItems>;
};

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

const Navigation = (props: any): JSX.Element => {
  const { username } = props;
  const [state, setState] = useState<State>({});

  useEffect(() => {
    // open menu
    const expandableMenuElements: Array<expandableMenuElement> = [];
    (async (): Promise<void> => {
      let elements: Array<navItems> = [];

        elements = await getNavElements(username);

        for (const item of elements) {
          if ("expandableMenuItems" in item) {
            expandableMenuElements.push({ name: item.text, openState: false });
          }
        }

        setState((prevState) => ({
          ...prevState,
          expandableMenuElements,
          navElements: elements,
          wizardJSX: undefined
        }));
      
      (document.getElementsByClassName("hmi-btn-menu")[0] as HTMLElement).click();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  // setState({ wizardItems: test })

  const handleExpandableMenu = (elementName: string): void => {
    const { expandableMenuElements } = state;

    expandableMenuElements?.map((item) => {
      // eslint-disable-next-line no-param-reassign
      item.openState =
        item.openState && item.name === elementName ? false : item.name === elementName;

      return item;
    });

    setState((prevState) => ({ ...prevState, expandableMenuElements }));
  };

  const handleChildClick = (
    _event: SyntheticEvent<Element, Event>,
    title: string,
    menuStructure: navItems[] | undefined,
    parentTitle?: string
  ): void => {
    if (menuStructure !== undefined) {
      setState((prevState) => ({
        ...prevState,
        submenu: { title, menuStructure, parentTitle }
      }));
    }
  };

  const closeSubmenuHandler = (): void => {
    setState((prevState) => ({ ...prevState, submenu: undefined }));
  };

  const hidden = undefined;
  if (state.submenu !== undefined) {
    return (
      <SubMenu
        title={state.submenu.title}
        navElements={state.submenu.menuStructure}
        onClick={closeSubmenuHandler}
        parentTitle={state.submenu.parentTitle}
      />
    );
  }
  return (
    <div className={`col-2 ${hidden} main-nav`} id="navbarCollapse">
      <ul className="nav flex-column">
        <li className="nav-head no-hover">
          <span>&nbsp;</span>
        </li>

        <li className="nav-head-title no-hover">
          <span className="menu-header">
             Main menu 
          </span>
        </li>



        {/* Generate the navigation */}
        {state.navElements?.map((navElement, i) => {
          const expandableMenuExist = "expandableMenuItems" in navElement;
          const subMenuExist = "subMenu" in navElement;
          const iconDirection =
            expandableMenuExist &&
            (state.expandableMenuElements?.find((item) => item.name === navElement.text)
              ?.openState ||
              navElement.open)
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
                    handleExpandableMenu(navElement.text);
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
                {subMenuExist && <span className="icon icon-arrow-next align-right" />}
              </Link>
              {expandableMenuExist && navElement.expandableMenuItems && (
                <ExpandableMenu
                  isOpen={iconDirection === "up"}
                  items={navElement.expandableMenuItems}
                  onClick={handleChildClick}
                  parentTitle={navElement.text}
                />
              )}
            </li>
          );

          return generatedLink;
        })}
      </ul>
    </div>
  );
};

export default Navigation;
