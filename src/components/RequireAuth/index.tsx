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
  console.log("from requireAuth");
  console.log(location);
  if (!loggedUserName) {
    return (
      <SignIn
        loggedUserName={loggedUserName}
        setUserName={setUserName}
        from={location}
      /> /* <Navigate to="/sign-in" state={{ from: location }} /> */
    );
  }
  return children;
};
