import { Redirect } from "react-router-dom";
import { useState } from "react";
import ReactDOM from "react-dom";
import { FormMaker, Modal } from "../../components/components";
import { signInFormConfig } from "@/config/config";

export const SignIn = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return ReactDOM.createPortal(
    <Modal modalName="Sign In" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <FormMaker props={signInFormConfig} />
    </Modal>,
    document.body
  );
};
