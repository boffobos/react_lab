import style from "./style.module.css";
import { useSelector } from "react-redux";
import { changePasswordFormConfig, defaultAvatar } from "../../config/config";
import { PASSWORD_LENGTH } from "@/constants";
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
import { useState, useEffect } from "react";
import { ref, string as yup } from "yup";
import axios from "axios";

interface IProfilePage {
  username?: string | null;
  data?: [];
}

interface IFormState {
  formNotification: Function;
  password: string | null;
  passwordErrorSetter: Function;
  newPassword: string | null;
  newPasswordErrorSetter: Function;
  rePassword: string | null;
  rePasswordErrorSetter: Function;
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

  //creating some state for saving passwords and errors from change password modal
  const [formState, setFormState] = useState<IFormState>({} as IFormState);

  /* Password change handlers */

  //set initial userId when
  const userId = useSelector((state) => state.users.userId);

  const passwordVerifying = () => {
    const userData = {
      id: userId,
      password: "",
      newPassword: "",
    };
    //destructuring data came from inputs
    const {
      formNotification,
      password,
      passwordErrorSetter,
      newPassword,
      newPasswordErrorSetter,
      rePassword,
      rePasswordErrorSetter,
    } = formState;
    //post request for change password
    const sendDataToServer = (data: {}) => {
      axios
        .post("/api/changePassword", data)
        .then((result) => {
          switch (result.status) {
            case 201: {
              formNotification("New password set up!");
              setTimeout(closeModal, 1500);
              break;
            }
            case 204: {
              passwordErrorSetter("Password incorrect");
              break;
            }
            default:
              return null;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const passwordCheck = yup().required("Enter your current password").trim();
    const newPassCheck = yup()
      .required("Enter new password")
      .trim()
      .min(PASSWORD_LENGTH, `Password require at least ${PASSWORD_LENGTH} characters`);
    const rePassCheck = yup().trim().oneOf([newPassword, null], "Password must match");
    passwordCheck
      .validate(password)
      .then((result) => {
        passwordErrorSetter("");
        userData.password = result;
        //when checked password successfuly check new password
        newPassCheck
          .validate(newPassword)
          .then(() => {
            newPasswordErrorSetter("");
            //then check new password and repeat
            rePassCheck
              .validate(rePassword)
              .then((result) => {
                rePasswordErrorSetter("");
                if (result) {
                  userData.newPassword = result;
                  sendDataToServer(userData);
                }
              })
              .catch((e) => {
                rePasswordErrorSetter(e.message);
              });
          })
          .catch((e) => {
            newPasswordErrorSetter(e.message);
          });
      })
      .catch((e) => {
        passwordErrorSetter(e.message);
      });

    //if (password.length < 6) passwordErrorSetter("Password too short");
  };

  useEffect(() => {
    if (!(formState && Object.keys(formState).length === 0 && Object.getPrototypeOf(formState) === Object.prototype))
      passwordVerifying();
  }, [formState]);

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

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    axios.get("/api/getProfile/" + userId).then((response) => {
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
        <FormMaker formFieldOptions={changePasswordFormConfig} onSubmit={setFormState} />
      </Modal>
    </>
  );
};
