import { ReactNode } from "react";
import style from "./style.module.css";

interface Props {
  title: string;
  children: ReactNode;
}

export const SideBarSection = ({ title, children }: Props) => {
  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <div className={style.children}>{children}</div>
    </div>
  );
};
