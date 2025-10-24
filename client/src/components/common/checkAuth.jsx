import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
const CheckAuth = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
export default CheckAuth;

