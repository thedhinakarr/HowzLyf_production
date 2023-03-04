import { Outlet,Navigate } from "react-router-dom";

function PrivateRoute(){
    let token = localStorage.getItem("token");
    return(
        token ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;