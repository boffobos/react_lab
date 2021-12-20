import { INotification } from "@/components/components";
import { useDispatch } from "react-redux";

export const useNotification = () => {
  const dispatch = useDispatch();
  return (message: INotification) => dispatch({ type: "notify/setMessage", payload: message });
};
