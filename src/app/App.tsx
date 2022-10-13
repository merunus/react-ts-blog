import { Toaster } from "react-hot-toast";
import { SidebarModal, UserModal } from "../components/Modals";
import "../scss/app.scss";
import Modal from "react-modal";
import AppRoutes from "./AppRoutes";

const App = () => {
  Modal.setAppElement("#root");
  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" />
      <SidebarModal />
      <UserModal />
    </>
  );
};

export default App;
