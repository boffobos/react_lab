import ReactDOM from "react-dom";
import { useState } from "react";
import { Modal, FormMaker } from "../../components/components";
import { signUpFormConfig } from "@/config/config";

export const SignUp = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <Modal
      modalName="Sign Up"
      isOpen={modalOpen}
      onClose={() => {
        setModalOpen(false);
      }}
    >
      <FormMaker props={signUpFormConfig} />
    </Modal>
  );
};
