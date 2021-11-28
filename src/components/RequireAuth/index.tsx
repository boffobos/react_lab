import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
  children: JSX.Element;
  modalSwitchFunc?: Function;
}

export const RequireAuth = ({ children /* loggedUserName, setUserName  */ }: Props) => {
  const location = useLocation();
  /* using stored in redux userName*/
  const loggedUserName = useSelector((state) => state.users.userName) || null;

  return !loggedUserName ? <Navigate to="/sign-in" state={{ from: location }} /> : children;
};
