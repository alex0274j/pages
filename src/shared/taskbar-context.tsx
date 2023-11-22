/* eslint-disable react/jsx-no-constructed-context-values */
import React, { Component } from "react";
import { TaskbarItem } from "../interfaces";

export interface TaskBar {
  items: Array<TaskbarItem>;
  setTaskbarElements(elements: Array<TaskbarItem>): void;
}

export const TaskbarContext = React.createContext({} as TaskBar);

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

type State = {
  items: Array<TaskbarItem>;
};

class TaskbarContextProvider extends Component<Props, State> {
  static updateTaskbar(): void {
    // eslint-disable-next-line no-console
    console.warn("updateTaskbar is deprecated since the web component updates itself.");
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      items: []
    };
  }

  setTaskbarElements = (elements: Array<TaskbarItem>): void => {
    this.setState({ items: elements });

    // TaskbarContextProvider.updateTaskbar();
  };

  render(): JSX.Element {
    const { items } = this.state;
    const { children } = this.props;
    return (
      <TaskbarContext.Provider
        value={{ items, setTaskbarElements: this.setTaskbarElements }}
      >
        {children}
      </TaskbarContext.Provider>
    );
  }
}

export default TaskbarContextProvider;
