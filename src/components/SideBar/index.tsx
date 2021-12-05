import { ReactNode } from "react";
import style from "./style.module.css";

interface Props {
  title: string;
  children: ReactNode;
}
export const SideBar = ({ title, children }: Props) => {
  return (
    <aside className={style.sidebarContainer}>
      <p className={style.titleStyle}>{title}</p>
      <div className={style.children}>{children}</div>
    </aside>
  );
};
