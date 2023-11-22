/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { MinebeaInput } from "../types/minebeaInput";

type dialogButton = {
  icon: string;
  text: string;
  testid?: string;
};

type dialogProps = {
  icon?: string;
  title?: string;
  message?: string;
  options?: Array<{
    key: string;
    value: string;
  }>;
  withIcon?: boolean;
  buttons: dialogButton[];
  style?: React.CSSProperties;
  minebeaInput?: MinebeaInput | Array<MinebeaInput>;
  handleButtons?: (event: React.SyntheticEvent, extra?: string, id?: string) => void;
  handleEnter?: (event: KeyboardEvent, val: string) => void;
  show?: boolean;
};

const DefaultDialog = (props: dialogProps): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);
  const {
    icon,
    title,
    message,
    minebeaInput,
    buttons,
    style,
    handleButtons,
    show,
    withIcon,
    handleEnter
  } = props;
  const [visibile, setVisibile] = useState(show);
  const [val, setPromt] = useState("");

  useEffect(() => {
    const input = document.getElementById("input");

    const inputFocus = document
      .querySelector("#input")
      ?.shadowRoot?.querySelector("#internal-input") as HTMLInputElement;
    if (inputFocus) {
      inputFocus.focus();
      inputFocus.selectionStart = inputFocus.value.length;
    }

    input?.focus();
    input?.addEventListener("keydown", sendEvent);

    return () => {
      input?.removeEventListener("keydown", sendEvent);
    };
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function sendEvent(e: KeyboardEvent): any {
    if (e.key === "Enter" && handleEnter !== undefined) {
      return handleEnter(e, val + (ref.current ? `|${ref.current.value}` : ""));
    }
    return null;
  }
  const closeIsCancel = true;
  // const event = new Event("click", { bubbles: false });

  const footerStyle = buttons.length === 1 ? { justifyContent: "flex-end" } : undefined;

  const modIcon = icon?.includes("-") ? icon : `icon-${icon}-dark`; // Handle wrong usage of icon
  return (
    <Modal
      centered
      show={visibile}
      backdrop="static"
      onHide={
        closeIsCancel
          ? (): void => {
              // @Hack: This is working but it's better to redefine the handleButton event to
              // allow sending undefined events.
              const elements = Array.from(
                document.getElementsByTagName("minebea-input")
              ) as HTMLInputElement[];
              elements?.find(({ value }) => value === "Cancel")?.click();
            }
          : (): void => setVisibile(false)
      }
      keyboard={false}
    >
      <Modal.Header closeButton={closeIsCancel}>
        <Modal.Title>
          {withIcon && <span className={`icon ${modIcon}`} />}
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="message">
        {message && <span>{message}</span>}
        {minebeaInput && minebeaInput instanceof Array === false && (
          <minebea-input
            style={
              style
                ? { ...style, display: "grid" }
                : {
                    display: "grid"
                  }
            }
            label-left={(minebeaInput as MinebeaInput)["label-left"] || " "}
            name="input"
            id="input"
            min={(minebeaInput as MinebeaInput).min}
            type={(minebeaInput as MinebeaInput).type}
            value={(minebeaInput as MinebeaInput).value}
            onInput={(e): void => setPromt((e.target as HTMLInputElement).value)}
          />
        )}
        {minebeaInput && minebeaInput instanceof Array && (
          <>
            {minebeaInput.map((input, i) => (
              <minebea-input
                // eslint-disable-next-line react/no-array-index-key
                key={i.toString()}
                style={
                  input.style
                    ? { ...input.style, display: "grid" }
                    : {
                        display: "grid"
                      }
                }
                label-left={(input as MinebeaInput)["label-left"] || " "}
                name="input"
                type={input.type}
                min={input.min}
                value={input.value}
                ref={input.type === "select" ? ref : undefined}
                onInput={(e): void => setPromt((e.target as HTMLInputElement).value)}
                id={input.id}
              >
                <br /> <br />
                {input.type === "select" && (
                  <>
                    {/* <option value="">Select an option</option> */}
                    {input.options?.map((option, ia) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <option key={ia.toString()} value={option.key}>
                        {option.value}
                      </option>
                    ))}
                  </>
                )}
              </minebea-input>
            ))}
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={footerStyle}>
        {buttons.map((button) => {
          return (
            <minebea-input
              key={button.text}
              type="button"
              onClick={
                handleButtons
                  ? (e): void => {
                      // console.dir(ref);

                      return handleButtons(
                        e,
                        val + (ref.current ? `|${ref.current.value}` : ""),
                        button.text
                      );
                    }
                  : undefined
              }
              icon={`icon icon-${button.icon}-dark`}
              data-testid={button.testid}
              value={button.text}
            />
          );
        })}
      </Modal.Footer>
    </Modal>
  );
};

DefaultDialog.defaultProps = {
  icon: "info",
  title: "Info",
  withIcon: true,
  options: undefined,
  show: true,
  minebeaInput: undefined,
  handleButtons: null,
  handleEnter: null,
  style: null,
  message: null
};

export default DefaultDialog;
export type { dialogProps };
