import style from "./style.module.css";
import { useSelector } from "react-redux";
import { changePasswordFormConfig, defaultAvatar } from "../../config/config";
import { PASSWORD_LENGTH, NOTIFICATION_TIMEOUT } from "@/constants";
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
  Notification,
  INotification,
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
  loginErrorSetter?: Function;
  password: string | null;
  passwordErrorSetter: Function;
  newPassword: string | null;
  newPasswordErrorSetter: Function;
  rePassword: string | null;
  rePasswordErrorSetter: Function;
}

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<INotification>({ text: "", status: "" });
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

  //set initial userId when
  const userId = useSelector((state) => state.users.userId);

  const sendDataToServer = (data: {}) => {
    const { passwordErrorSetter } = formState;
    axios
      .post("/api/changePassword", data)
      .then((result) => {
        switch (result.status) {
          case 201: {
            closeModal();
            setNotification({ text: "New password set up!", status: "success" });
            break;
          }
          case 204: {
            passwordErrorSetter("Password incorrect");
            break;
          }
          default:
            return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* Password change handlers */
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
      })
      .catch((e) => {
        passwordErrorSetter(e.message);
      });
    newPassCheck
      .validate(newPassword)
      .then((result) => {
        if (formState.newPassword === result) {
          //then check new password and repeat
          setFormState((state) => ({ ...state, newPassword: result }));
          rePassCheck
            .validate(rePassword)
            .then((result) => {
              if (result) {
                rePasswordErrorSetter("");
                userData.newPassword = result;
                setFormState((state) => ({ ...state, rePassword: result }));
                sendDataToServer(userData);
              }
            })
            .catch((e) => {
              rePasswordErrorSetter(e.message);
            });
        }
        newPasswordErrorSetter("");
      })
      .catch((e) => {
        newPasswordErrorSetter(e.message);
      });
  };
  //check passwords and sent data to server
  useEffect(() => {
    if (!(formState && Object.keys(formState).length === 0 && Object.getPrototypeOf(formState) === Object.prototype)) {
      passwordVerifying();
    }
  }, [formState.password, formState.rePassword, formState.newPassword]);

  //functions for changing user info fields
  const changeUserName = (name: string) => {
    if (userName !== name) {
      setUserName(name);
      setIsChanged(true);
      return true;
    }
    return false;
  };

  const changeUserEmail = (email: string) => {
    const checkEmail = yup().required("Enter email").trim().email("Enter valid email!");
    return checkEmail
      .validate(email)
      .then((result) => {
        if (userEmail !== email) {
          setIsChanged(true);
          setEmail(result);
          return true;
        } else {
          return false;
        }
      })
      .catch((e) => {
        return setNotification({ text: e.message, status: "error" });
      });
  };

  const changeUserCity = (city: string) => {
    if (userCity !== city) {
      setCity(city);
      setIsChanged(true);
      return true;
    }
    return false;
  };

  const changeUserBOD = (date: string) => {
    if (userBOD !== date) {
      setBOD(date);
      setIsChanged(true);
      return true;
    }
    return false;
  };

  const changeDescription = (descr: string) => {
    if (userDescription !== descr) {
      setDescription(descr);
      setIsChanged(true);
      return true;
    }
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
          setNotification({ text: "Changes have been saved!", status: "success" });
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
      <Notification message={notification} />
    </>
  );
};
