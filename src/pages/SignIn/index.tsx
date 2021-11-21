import { SignInModal } from "@/components/components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  loggedUserName: string | null;
  setUserName: Function;
  from?: Location;
}

export const SignIn = ({ loggedUserName, setUserName, from }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const locations = useLocation();
  const navigate = useNavigate();
  const redirectAfterLogin = from?.pathname;

  useEffect(() => {
    if (loggedUserName) {
      navigate(redirectAfterLogin);
    }
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h3>Login to view this page!</h3>
      <SignInModal handlerLogin={setUserName} isOpen={isModalOpen} onClose={closeModal} />;
    </>
  );
};
