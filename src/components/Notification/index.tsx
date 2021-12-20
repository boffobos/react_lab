import style from "./style.module.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { NOTIFICATION_TIMEOUT } from "@/constants";
import { useDispatch, useSelector } from "react-redux";

export interface INotification {
  message: string | "";
  status: "success" | "error" | "warn" | "";
}

export const sendNotification = (message: INotification) => {
  const dispatch = useDispatch();
  dispatch({ type: "notify/setMessage", payload: message });
};

export const Notification = () => {
  const msg = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const clearNotificationTimout = () => {
    setTimeout(() => dispatch({ type: "notify/clearMessage" }), NOTIFICATION_TIMEOUT);
  };
  useEffect(() => {
    if (msg.message) return clearNotificationTimout();
  }, [msg]);

  return msg.message
    ? ReactDOM.createPortal(
        <div className={`${style.container} ${style[msg.status]}`}>
          <p className={style[msg.status]}>{msg.message}</p>
        </div>,
        document.body
      )
    : null;
};
