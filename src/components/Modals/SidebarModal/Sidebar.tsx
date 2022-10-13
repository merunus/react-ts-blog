import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectUserData } from "../../../redux/user/selectors";
import { closeModal } from "../../../redux/user/slice";
import { handleCustomStyles } from "../../../utils/modalCustomStyles";
import SidebarContainer from "./SidebarContainer";

const SidebarModal: React.FC = () => {
  const { isModalOpen } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const customStyles = handleCustomStyles("sidebar");

  const close = () => {
    dispatch(closeModal("sidebarModal"));
  };

  return (
    <SidebarContainer
      isModalOpen={isModalOpen}
      close={close}
      customStyles={customStyles}
    />
  );
};

export default SidebarModal;
