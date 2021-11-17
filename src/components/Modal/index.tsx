import style from "./style.module.css";
import { ReactEventHandler, ReactNode, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  modalName: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: ReactEventHandler;
}

export const Modal = ({ modalName, children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div className={style.child}>
        <div className={style.header}>
          <h3>{modalName}</h3>
          <div className={style.closeBtn} onClick={onClose}></div>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
