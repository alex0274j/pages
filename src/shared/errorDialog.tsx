import React from "react";
import Modal from "react-bootstrap/Modal";

type dialogProps = {
  header?: string;
  icon?: string;
  message: string;
  show: boolean;
  buttonName?: string;
  buttonIcon?: string;
  handleClose?: () => void;
};

const ErrorDialog = (props: dialogProps): JSX.Element => {
  const { message, header, icon, show, handleClose, buttonName, buttonIcon } = props;

  return (
    <Modal centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={`icon ${icon}`} />
          {header || "Error"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="message">
        <span>{message}</span>
      </Modal.Body>
      <Modal.Footer>
        <span />
        <minebea-input
          data-testid="error-dialog-button"
          type="button"
          onClick={handleClose}
          icon={buttonIcon}
          value={buttonName}
        />
      </Modal.Footer>
    </Modal>
  );
};

ErrorDialog.defaultProps = {
  header: "Error",
  icon: "icon-info",
  buttonName: "OK",
  buttonIcon: "icon-ok-dark",
  handleClose: null
};

export default ErrorDialog;
