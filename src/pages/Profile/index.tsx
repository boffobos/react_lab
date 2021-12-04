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
import { string as yup } from "yup";
import axios from "axios";

interface IProfilePage {
  username?: string | null;
  data?: [];
}

export interface IFormState {
  formNotification: Function;
  login?: string | null;
  loginErrorSetter?: string | null;
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
  const [notification, setNotification] = useState("");
  //set of states for user information fields
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userCity, setCity] = useState("");
  const [userBOD, setBOD] = useState("");
  const [userDescription, setDescription] = useState("");
  const [userAvatar, setAvatar] = useState(defaultAvatar);
  const [isChanged, setIsChanged] = useState(false);

  //creating some state for saving passwords and errors from change password modal
  const [formState, setFormState] = useState<IFormState>({} as IFormState);

  /* Password change handlers */

  //set initial userId when
  const notificationTimeout = 2500;
  const setNotificationMessage = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), notificationTimeout);
  };
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
              closeModal();
              //formNotification("New password set up!");
              setNotificationMessage("New password set up!");
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
    const rePassCheck = yup().trim().oneOf([newPassword, null], "Passwords must match");
    passwordCheck
      .validate(password)
      .then((result) => {
        passwordErrorSetter("");
        userData.password = result;
        //when checked password successfuly check new password
        newPassCheck
          .validate(newPassword)
          .then((result) => {
            setFormState((state) => ({ ...state, newPassword: result }));
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
  };

  useEffect(() => {
    if (!(formState && Object.keys(formState).length === 0 && Object.getPrototypeOf(formState) === Object.prototype))
      passwordVerifying();
  }, [formState]);

  //functions for changing user info fields
  const changeUserName = (name: string) => {
    setUserName(name);
    if (userName !== name) setIsChanged(true);
    return true;
  };

  const changeUserEmail = (email: string) => {
    const checkEmail = yup().required("Enter email").trim().email("Enter valid email!");
    return checkEmail
      .validate(email)
      .then((result) => {
        if (userEmail !== email) {
          setIsChanged(true);
          setEmail(result);
        }
        return true;
      })
      .catch((e) => {
        return setNotificationMessage(e.message);
      });
  };

  const changeUserCity = (city: string) => {
    setCity(city);
    if (userCity !== city) setIsChanged(true);
    return true;
  };

  const changeUserBOD = (date: string) => {
    setBOD(date);
    if (userBOD !== date) setIsChanged(true);
    return true;
  };

  const changeDescription = (descr: string) => {
    setDescription(descr);
    if (userDescription !== descr) setIsChanged(true);
    return true;
  };

  //functions for pressed buttons
  const saveProfile = () => {
    const userChangedData = {
      login: "",
      email: "",
      city: "",
      decsription: "",
    };
    userChangedData.login = userName;
    userChangedData.email = userEmail;
    userChangedData.city = userCity;
    userChangedData.decsription = userDescription;

    axios
      .post("/api/changeProfile", userChangedData)
      .then((response) => {
        if (response.status === 201) {
          setIsChanged(false);
          setNotificationMessage("Changes have been saved!");
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

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
        setEmail(user.email);
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
        {notification ? <div className={style.notify}>{notification}</div> : null}
        <Section title={`${userName} profile page`}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <UserPhoto userName={userName} avatar={userAvatar} />
              <UserInfo>
                <DataRow
                  isEditable={!isEditing}
                  title={"User Name"}
                  content={userName}
                  onEditing={setIsEditing}
                  onChange={changeUserName}
                />
                <DataRow
                  isEditable={!isEditing}
                  title={"Email"}
                  content={userEmail}
                  onEditing={setIsEditing}
                  onChange={changeUserEmail}
                />
                <DataRow
                  isEditable={!isEditing}
                  title={"City"}
                  content={userCity}
                  onEditing={setIsEditing}
                  onChange={changeUserCity}
                />
                <DataRow
                  isEditable={false}
                  title={"Birth Date"}
                  content={userBOD}
                  onEditing={setIsEditing}
                  onChange={changeUserBOD}
                />
                <DataRow
                  isEditable={!isEditing}
                  title={"Description"}
                  content={userDescription}
                  onEditing={setIsEditing}
                  onChange={changeDescription}
                />
              </UserInfo>
              <UpdateProfile>
                <CustomButton title={"Save profile"} onClick={saveProfile} disabled={!isChanged} />
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
