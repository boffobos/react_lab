import { ReactNode } from "react";
import style from "./style.module.css";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}
export const Section = ({ title, children, className }: Props) => {
  return (
    <section className={style.sectionWrapper}>
      <p className={style.titleStyle}>{title}</p>
      <div className={`${style.children} ${className}`}>{children}</div>
    </section>
  );
};
