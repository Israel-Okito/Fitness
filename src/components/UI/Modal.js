import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

function CloseIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" fill={props.color} />
      <path
        d="M17.657 6.343a.999.999 0 0 0-1.414 0L12 10.586 8.757 7.343a.999.999 0 1 0-1.414 1.414L10.586 12l-3.243 3.243a.999.999 0 1 0 1.414 1.414L12 13.414l3.243 3.243a.999.999 0 1 0 1.414-1.414L13.414 12l3.243-3.243a.999.999 0 0 0 0-1.414z"
        fill="#fff"
      />
    </svg>
  );
}

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}></div>,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <div className={styles.modalOverlay}>{props.children}</div>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default Modal;
export { CloseIcon };
