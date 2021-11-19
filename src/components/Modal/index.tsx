import style from "./style.module.css";
import { ReactEventHandler, ReactNode } from "react";
import ReactDOM from "react-dom";

interface Props {
  modalName: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: Function;
}

export const Modal = ({ modalName, children, isOpen, onClose }: Props) => {
  const closeModal: ReactEventHandler = () => {
    onClose();
  };
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div className={style.child}>
        <div className={style.header}>
          <h3>{modalName}</h3>
          <div className={style.closeBtn} onClick={closeModal}></div>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
