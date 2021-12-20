import style from "./style.module.css";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { NOTIFICATION_TIMEOUT } from "@/constants";
import { useDispatch } from "react-redux";

export interface INotification {
  text: string | "";
  status: "success" | "error" | "warn" | "";
}

interface Props {
  message: INotification;
}

// export const sendNotification = (message: INotification) => {
//   const dispatch = useDispatch();
//   dispatch({ type: "notify/setMessage", payload: message });
// };

export const Notification = ({ message }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const showNotification = () => {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), NOTIFICATION_TIMEOUT);
  };
  useEffect(() => {
    if (message.text) return showNotification();
    return;
  }, [message]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className={style.container}>
          <p className={style[message.status]}>{message.text}</p>
        </div>,
        document.body
      )
    : null;
};
