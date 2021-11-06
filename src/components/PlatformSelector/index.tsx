import { ReactElement } from "react";
import style from "./style.module.css";

interface Props {
  categoryTitle: string;
  imgURL: string;
  imgAlt: string;
}

export const PlatformSelector = (props: Props): ReactElement => {
  return (
    <div className={style.container}>
      <div className={style.categoryIcon}>
        <img src={props.imgURL} alt={props.imgAlt} />
      </div>
      <div className={style.categotyTitle}>
        {props.categoryTitle}
      </div>
    </div>
  );
};
