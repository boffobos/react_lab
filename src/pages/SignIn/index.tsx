import { SignInModal } from "@/components/components";
import { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HOME_URL } from "../../constants";

interface Props {
  loggedUserName?: string | null;
  setUserName?: Function;
}

export const SignIn = ({}: /* loggedUserName, setUserName */ Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  const loggedUserName = useSelector((state) => state.users.userName);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(HOME_URL);
  };

  return !loggedUserName ? (
    <>
      {location.pathname !== "/sign-in" ? <h3>Login to view this page!</h3> : null}
      <SignInModal isOpen={isModalOpen} onClose={closeModal} />;
    </>
  ) : (
    <Navigate to={fromPage} />
  );
};
