import { Navigate } from "react-router-dom";
import { Paths } from "../models/paths";

type TProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={Paths.Register} />;
  }
  return children;
};

export default ProtectedRoute;
