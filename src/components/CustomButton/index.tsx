import React from "react";
import style from "./style.module.css";

interface IButtonPorps {
  title: string;
  onClick?: Function;
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button";
}

export const CustomButton = ({ title, onClick, className, disabled, type }: IButtonPorps) => {
  const handleClick: React.MouseEventHandler = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button disabled={disabled || false} className={`${className} ${style.btn}`} onClick={handleClick} type={type}>
      {title}
    </button>
  );
};
