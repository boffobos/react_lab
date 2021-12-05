import { ReactElement } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

interface Props {
  categoryTitle: string;
  categoryURL: string;
  imgURL: string;
  imgAlt: string;
}

export const PlatformSelector = (props: Props): ReactElement => {
  return (
    <Link to={props.categoryURL}>
      <div className={style.container}>
        <div className={style.categoryIcon}>
          <img src={props.imgURL} alt={props.imgAlt} />
        </div>
        <div className={style.categotyTitle}>{props.categoryTitle}</div>
      </div>
    </Link>
  );
};
