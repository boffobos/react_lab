import { useField, ErrorMessage } from "formik";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { formErrorIcon } from "@/config/config";
import { ReactChildren } from "react";

interface ICustomInput {
  label: string;
  name: string;
  id?: string;
  faIcon?: IconProp;
  children?: ReactChildren;
}
export const CustomInput = ({ label, faIcon, ...props }: ICustomInput) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className={style.groupControl}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className={style.input} {...props} {...field} />
        {faIcon ? (
          meta.error && meta.touched ? (
            <FontAwesomeIcon title={meta.error} icon={formErrorIcon} className={style.errorIcon} />
          ) : (
            <FontAwesomeIcon icon={faIcon} className={style.icon} />
          )
        ) : null}
      </div>
      <ErrorMessage name={props.id || props.name} className={style.errorMessage} component="div" />
    </>
  );
};

export const CustomSelect = ({ label, children, ...props }: ICustomInput) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className={style.groupControl}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props}>
          {children}
        </select>
      </div>
      <ErrorMessage name={props.id || props.name} className={style.errorMessage} component="div" />
    </>
  );
};

export const CustomCheckBox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <div className={style.groupControl}>
        <label className="checkbox-input" htmlFor={props.id || props.name}>
          {label}
        </label>
        <input type="checkbox" {...field} {...props} />
      </div>
      <ErrorMessage name={props.id || props.name} className={style.errorMessage} component="div" />
    </>
  );
};
