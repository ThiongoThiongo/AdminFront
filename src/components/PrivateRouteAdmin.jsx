import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRouteAdmin = () => {
    const {userInfo } = useSelector((state) => state.auth)

  return  userInfo.type ==='Admin' ? <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateRouteAdmin
