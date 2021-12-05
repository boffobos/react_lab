import style from "./style.module.css";
import { CustomButton } from "../../components";

export const UpdateProfile = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
