import { SignInModal } from "@/components/components";
import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

interface Props {
  loggedUserName?: string | null;
  setUserName?: Function;
}

export const SignIn = ({}: /* loggedUserName, setUserName */ Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  /* using reduct store */
  const dispatch = useDispatch();
  const setUserName = (userName) => {
    dispatch({ type: "users/login", payload: userName });
  };
  const loggedUserName = useSelector((state) => state.users.userName);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return !loggedUserName ? (
    <>
      {location.pathname !== "/sign-in" ? <h3>Login to view this page!</h3> : null}
      <SignInModal handlerLogin={setUserName} isOpen={isModalOpen} onClose={closeModal} />;
    </>
  ) : (
    <Navigate to={fromPage} />
  );
};
