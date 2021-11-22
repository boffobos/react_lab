import { Navigate, useLocation } from "react-router-dom";
import { SignIn } from "../../pages/pages";
interface Props {
  children: JSX.Element;
  loggedUserName: string | null;
  setUserName: Function;
  isModalOpen: boolean;
  modalSwitchFunc: Function;
}

export const RequireAuth = ({ children, loggedUserName, setUserName }: Props) => {
  const location = useLocation();
  return !loggedUserName ? <Navigate to="/sign-in" state={{ from: location }} /> : children;
};
