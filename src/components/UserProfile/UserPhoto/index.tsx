import style from "./style.module.css";
import { CustomButton } from "../../components";

interface Props {
  userName: string;
  avatar: string;
}

export const UserPhoto = ({ avatar, userName }: Props) => {
  const changeImage = () => {};
  return (
    <div className={style.container}>
      <div className={style.imageContainer}>
        <img src={avatar} alt={`${userName} avatar`} />
      </div>
      <CustomButton title={"Change profile image"} onClick={changeImage} />
    </div>
  );
};
