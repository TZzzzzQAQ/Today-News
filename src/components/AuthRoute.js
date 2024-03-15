import React from 'react';
import {getToken} from "@/utils";
import {Navigate} from "react-router-dom";

const AuthRoute = ({children}) => {
    const token = getToken();
    if (token) {
        return <>{children}</>
    }
    return <Navigate to={'/login'} replace></Navigate>
};

export default AuthRoute;
