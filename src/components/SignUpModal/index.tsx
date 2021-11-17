import ReactDOM from "react-dom";
import { ReactEventHandler } from "react";
import { Modal, FormMaker, IFormMaker } from "../components";
import { signUpFormConfig } from "@/config/config";

interface ISignUpModal extends IFormMaker {
  isOpen: boolean;
  onClose: ReactEventHandler;
}

// export const SignUp = () => {
//   const [modalOpen, setModalOpen] = useState(true);

//   return (
//     <Modal
//       modalName="Sign Up"
//       isOpen={modalOpen}
//       onClose={() => {
//         setModalOpen(false);
//       }}
//     >
//       <FormMaker props={signUpFormConfig} />
//     </Modal>
//   );
// };

const SignUpModal = ({ isOpen, onSubmit, onClose }: ISignUpModal) => {
  const form = {
    button: { type: "submit", text: "Register" },
    children: [
      { name: "login", label: "Login", faIcon: faIdCard, type: "text" },
      { name: "password", label: "Password", faIcon: faLock, type: "password" },
      { name: "re-password", label: "Repeat Password", faIcon: faLock, type: "password" },
    ],
  };
  return ReactDOM.createPortal(
    <Modal modalName="Sign Up" isOpen={isOpen} onClose={onClose}>
      <FormMaker formFieldOptions={formFieldOptions} closeModal={onClose} onSubmit={onSubmit} />
    </Modal>,
    document.body
  );
};
