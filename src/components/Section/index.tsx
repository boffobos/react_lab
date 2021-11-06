import { ReactNode } from "react";
import style from "./style.module.css";

interface Props {
  title: string;
  children: ReactNode;
}
export const Section = ({ title, children }: Props) => {
  return (
    <section className={style.sectionWrapper}>
      <p className={style.titleStyle}>{title}</p>
      <div>{children}</div>
    </section>
  );
};
