import style from "./style.module.css";

interface Props {
  groupName: string;
  options: [
    {
      label: string;
      value: string;
      selected?: boolean;
    }
  ];
  onChange: Function;
}

export const CustomRadioButtons = ({ options, onChange, groupName }: Props) => {
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <form className={style.container} action="" onChange={handleChange}>
      {options.map((option) => {
        return (
          <div key={option.value} className={style.radioGroup}>
            <input
              type="radio"
              id={option.value}
              value={option.value}
              name={groupName}
              defaultChecked={option.selected || false}
              className={style.radioBtn}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        );
      })}
    </form>
  );
};
