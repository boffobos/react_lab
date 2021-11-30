import style from "./style.module.css";
import { CustomButton } from "../../components";

export const UpdateProfile = () => {
  const saveProfile = () => {};
  const changePassword = () => {};

  return (
    <div className={style.container}>
      <CustomButton title={"Save profile"} onClick={saveProfile} />
      <CustomButton title={"Change password"} onClick={changePassword} />
    </div>
  );
};
