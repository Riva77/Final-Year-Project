import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem("userToken") ? true : false;
  return (
    //user authenticate xaina vani login ma navigate garxa but if xa vani
    //privateroutes ko access dinxa user lai jun chai outlet ma hunxa
    //outlet = yeuta section ja chai user authenticate vai sake paxi private routes ko content haru render hunxa
    isAuthenticated ? <Outlet /> : <Navigate to="/" />
  );
};

export default PrivateRoutes;
