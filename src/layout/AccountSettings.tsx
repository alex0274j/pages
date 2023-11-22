import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { config } from "../shared/config";
import ErrorDialog from "../shared/errorDialog";
import { resetUsername } from "../features/user/userSlice";

declare global {
  interface Window {
    toggleHmiMenu(event: EventTarget): void;
    openUserMenu(): void;
  }
}

interface TMPI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/no-unused-prop-types
  navigate: any;
}

interface myProps extends TMPI {
  username: string;
  // eslint-disable-next-line react/no-unused-prop-types
  resetUsername: () => void;
}

/**
 * The AccountSettings component is responsible for displaying the user's account settings.
 * It provides a form for changing the user's language and a button for opening the user menu.
 * The component also displays an error dialog if there is an error while changing the user's setting.
 * If the user's password is changeable, the component also provides a form for changing the user's password.
 */
const AccountSettings = (props: myProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, showDialog] = useState(false);
  const [message, setMessage] = useState<
    string | undefined | { message: string; icon: string }
  >(undefined);

  // user management

  const passwordIsChangeable = false;

  const onClick = (): void => {
    if (inputRef.current) {
      toggleLanguage(inputRef.current.value);
    }
    window.openUserMenu();
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      tryChangePassword();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const toggleLanguage = (_lang: string): void => {};

  const tryChangePassword = async (): Promise<void> => {

    const newPassword = (document.getElementsByName("new_password")[0] as HTMLInputElement)
      ?.value;
    const retypeNewPassword = (
      document.getElementsByName("retype-new-password")[0] as HTMLInputElement
    )?.value;

    if (!newPassword) {
      return;
    }

    if (newPassword !== retypeNewPassword) {
      setMessage("New passwords do not match");
    } else if (newPassword.length < 8) {
      setMessage("Password too short (at least 8)");
    } 
  };

  function logout(): void {

    dispatch(resetUsername());

    window.openUserMenu();
    setTimeout(() => navigate(`${config.BASE_URL}/login`), 500);
  }

  const { username } = props;
  return (
    <>
      <div id="usermenu">
        <div className="row subheader">
          <div className="col">
            <span>Account Settings</span>
            <span className="icon icon-help-grey float-end" style={{ display: "none" }} />
          </div>
          <form className="parameter-page">
            <div className="row">
              <div className="col-12">
                <div className="inner wc">
                  <minebea-input
                    name="3"
                    type="select"
                    label-left="Language"
                    ref={inputRef}
                    readonly
                  >
                    <option value="en">English</option>
                    <option value="de">German</option>
                  </minebea-input>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-12 forcedAlternateColorEvenInner"
                style={{ pointerEvents: "none" }}
              >
                <div
                  className="inner"
                  style={{ paddingLeft: "50%", paddingRight: "11px" }}
                >
                  <minebea-input
                    style={{
                      pointerEvents: "all",
                      width: "120px",
                      float: "left",
                      marginRight: "25px",
                      marginLeft: "9px"
                    }}
                    onClick={(): void => logout()}
                    name="1"
                    type="button"
                    float="left"
                    value="Logout"
                    icon="icon-logout-dark"
                  />
                  {passwordIsChangeable && (
                    <minebea-input
                      style={{
                        pointerEvents: "all",
                        width: "120px",
                        float: "left"
                      }}
                      onClick={(): void => showDialog(true)}
                      name="2"
                      type="button"
                      float="left"
                      value="Change password"
                      icon="icon-change-password-dark"
                    />
                  )}
                  <minebea-input
                    style={{
                      pointerEvents: "all",
                      float: "right",
                      width: "120px",
                      paddingRight: "9px"
                    }}
                    onClick={onClick}
                    name="3"
                    type="button"
                    value="OK"
                    icon="icon-ok-dark"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {passwordIsChangeable && (
        <Modal
          centered
          show={visible}
          backdrop="static"
          onHide={(): void => showDialog(false)}
          keyboard={false}
          onKeyPress={handleKeyPress}
        >
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title>
              <span className="" />
              Change password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="message"
          >
            <minebea-input
              style={{ display: "grid" }}
              label-left="Webpage user"
              name="user"
              type="text"
              value={username}
              readonly
            />
            <minebea-input
              style={{ display: "grid" }}
              label-left="Current password"
              name="cur_password"
              type="password"
            />
            <minebea-input
              style={{ display: "grid" }}
              label-left="New password"
              name="new_password"
              type="password"
            />
            <minebea-input
              style={{ display: "grid" }}
              label-left="New password again"
              name="retype-new-password"
              type="password"
            />
          </Modal.Body>
          <Modal.Footer>
            <minebea-input
              type="button"
              onClick={(): void => showDialog(false)}
              icon="icon icon-close-dark"
              value="Cancel"
            />
            <minebea-input
              type="button"
              onClick={tryChangePassword}
              icon="icon icon-ok-dark"
              value="OK"
            />
          </Modal.Footer>
        </Modal>
      )}
      {message && (
        <ErrorDialog
          handleClose={(): void => setMessage(undefined)}
          message={typeof message === "string" ? message : message.message}
          icon={typeof message === "string" ? "icon-alarm" : message.icon}
          header="Change password"
          show
        />
      )}
    </>
  );
};
export default AccountSettings;
