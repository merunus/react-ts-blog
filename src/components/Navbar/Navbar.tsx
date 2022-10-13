import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";
import { openModal } from "../../redux/user/slice";
import NavbarContainer from "./NavbarContainer";

const Navbar: React.FC = () => {
  const { user } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const openSidebar = (name: string) => dispatch(openModal(name));

  return <NavbarContainer user={user} openSidebar={openSidebar} />;
};

export default Navbar;
