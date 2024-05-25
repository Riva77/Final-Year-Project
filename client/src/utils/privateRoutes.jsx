import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ element: Element, isVerified, ...rest }) => {
  const user = useSelector((state) => state.user.data);
  return (
    <Route
      {...rest}
      element={
        isVerified ? (
          <Element />
        ) : (
          <Navigate to={`/otpVerification?email=${user?.email}`} />
        )
      }
    />
  );
};

export default PrivateRoutes;
