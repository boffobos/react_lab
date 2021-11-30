import { useSelector } from "react-redux";
import { Section, UserPhoto, UserInfo, DataRow, Spinner, UpdateProfile } from "../../components/components";
import style from "./style.module.css";
import { useState, useEffect } from "react";

interface IProfilePage {
  username?: string | null;
  data?: [];
}

export const Profile = ({}: /* username, data */ IProfilePage) => {
  const [isLoading, setIsLoading] = useState(false); //change to true after server request set up
  const [isEditing, setIsEditing] = useState(false);
  //set of states for user information fields
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [bDate, setBDate] = useState("");
  const [description, setDescription] = useState("");

  const fielIsEditingSet = (value: boolean) => {
    setIsEditing(value);
  };

  //functions for changing user info fields
  const changeUserName = (name: string) => {
    setUserName(name);
  };

  const changeUserCity = (city: string) => {
    setCity(city);
  };

  const changeUserBOD = (date: string) => {
    setBDate(date);
  }

  const changeDescription = (descr: string) => {
    setDescription(descr)
  }

  const userId = useSelector((state) => state.users.userId);

  useEffect(() => {}, [userId]);

  const avatar = useSelector((state) => state.users.avatar);

  const username = useSelector((state) => state.users.userName);

  const bODate = new Date("1998-09-06");
  const bdateCont = bODate.toLocaleString("ru-RU", { dateStyle: "short" });
  const decript = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, nisi?";

  return (
    <main
      className={style.profilePage}
      style={{
        background: `url(/assets/images/bg_2.jpg) no-repeat center center/cover`,
      }}
    >
      <Section title={`${username} profile page`}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <UserPhoto userName={userName} avatar={avatar} />
            <UserInfo>
              <DataRow
                isEditable={!isEditing}
                title={"User Name"}
                content={"Admin"}
                onEditing={fielIsEditingSet}
                onChange={changeUserName}
              />
              <DataRow
                isEditable={!isEditing}
                title={"City"}
                content={"London"}
                onEditing={fielIsEditingSet}
                onChange={changeUserCity}
              />
              <DataRow
                isEditable={!isEditing}
                title={"Birth Date"}
                content={bdateCont}
                onEditing={fielIsEditingSet}
                onChange={changeUserBOD}
              />
              <DataRow
                isEditable={!isEditing}
                title={"Description"}
                content={decript}
                onEditing={fielIsEditingSet}
                onChange={changeDescription}
              />
            </UserInfo>
            <UpdateProfile />
          </>
        )}
      </Section>
    </main>
  );
};
