import React from "react";
import style from "./style.module.css";

interface IButtonPorps {
  title: string;
  onClick: Function;
  className?: string;
  disabled?: boolean;
}

export const CustomButton = ({ title, onClick, className, disabled }: IButtonPorps) => {
  const handleClick: React.MouseEventHandler = (e) => {
    onClick(e);
  };

  return (
    <button disabled={disabled || false} className={`${className} ${style.btn}`} onClick={handleClick}>
      {title}
    </button>
  );
};
