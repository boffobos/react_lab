import { useField, ErrorMessage } from "formik";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { formErrorIcon } from "@/config/config";

interface ICustomInput {
  label: string;
  name: string;
  id?: string;
  faIcon: IconProp;
}
export const CustomInput = ({ label, faIcon, ...props }: ICustomInput) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className={style.groupControl}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className={style.input} {...props} {...field} />
        {meta.error && meta.touched ? (
          <FontAwesomeIcon title={meta.error} icon={formErrorIcon} className={style.errorIcon} />
        ) : (
          <FontAwesomeIcon icon={faIcon} className={style.icon} />
        )}
      </div>
      <ErrorMessage name={props.id || props.name} className={style.errorMessage} component="div" />
    </>
  );
};
