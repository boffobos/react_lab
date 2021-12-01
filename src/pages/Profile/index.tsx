import { useSelector } from "react-redux";
import { changePasswordFormConfig, defaultAvatar } from "../../config/config";
import {
  Section,
  UserPhoto,
  UserInfo,
  DataRow,
  Spinner,
  UpdateProfile,
  CustomButton,
  Modal,
  FormMaker,
} from "../../components/components";
import style from "./style.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface IProfilePage {
  username?: string | null;
  data?: [];
}

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true); //change to true after server request set up
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //set of states for user information fields
  const [userName, setUserName] = useState("");
  const [city, setCity] = useState("");
  const [BOD, setBOD] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar);

  //creating some state for changing password modal
  const formContents = changePasswordFormConfig;
  const formInputs = formContents.children;
  const [formState, setFormState] = useState({});

  //set initial userId when
  const userId = useSelector((state) => state.users.userId);

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
    setBOD(date);
  };

  const changeDescription = (descr: string) => {
    setDescription(descr);
  };

  //functions for pressed buttons
  const saveProfile = () => {};

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get("/api/getProfile/" + userId).then((response) => {
      console.log(response);
      const user = response.data;
      if (response.status === 200) {
        setUserName(user.login);
        setCity(user.city);
        setAvatar(user.avatar || defaultAvatar);
        let date = new Date(user.birthDate);
        setBOD(date.toLocaleDateString("ru-RU", { dateStyle: "short" }));
        setDescription(user.description);
        setIsLoading(false);
      }
    });
  }, [userId]);

  return (
    <>
      <main
        className={style.profilePage}
        style={{
          background: `url(/assets/images/bg_2.jpg) no-repeat center center/cover`,
        }}
      >
        <Section title={`${userName} profile page`}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <UserPhoto userName={userName} avatar={avatar} />
              <UserInfo>
                <DataRow
                  isEditable={!isEditing}
                  title={"User Name"}
                  content={userName}
                  onEditing={fielIsEditingSet}
                  onChange={changeUserName}
                />
                <DataRow
                  isEditable={!isEditing}
                  title={"City"}
                  content={city}
                  onEditing={fielIsEditingSet}
                  onChange={changeUserCity}
                />
                <DataRow
                  isEditable={!isEditing}
                  title={"Birth Date"}
                  content={BOD}
                  onEditing={fielIsEditingSet}
                  onChange={changeUserBOD}
                />
                <DataRow
                  isEditable={!isEditing}
                  title={"Description"}
                  content={description}
                  onEditing={fielIsEditingSet}
                  onChange={changeDescription}
                />
              </UserInfo>
              <UpdateProfile>
                <CustomButton title={"Save profile"} onClick={saveProfile} />
                <CustomButton title={"Change password"} onClick={openModal} />
              </UpdateProfile>
            </>
          )}
        </Section>
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal} modalName="Change Password">
        <FormMaker formFieldOptions={formContents} onSubmit={closeModal} />
      </Modal>
    </>
  );
};
