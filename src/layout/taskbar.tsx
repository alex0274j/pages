import React from "react";
import { TaskbarContext } from "../shared/taskbar-context";
import "@minebea/hmi/public/js/minebea-icons.bundle";
import "@minebea/hmi/public/js/minebea-taskbar.bundle";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "minebea-taskbar": { items: string };
    }
  }
}

const Taskbar = (): JSX.Element => {
  return (
    <TaskbarContext.Consumer>
      {(taskbarContext): JSX.Element => {
        return (
          <minebea-taskbar
            data-testid="taskbar"
            items={JSON.stringify(taskbarContext.items)}
          />
        );
      }}
    </TaskbarContext.Consumer>
  );
};

export default Taskbar;
