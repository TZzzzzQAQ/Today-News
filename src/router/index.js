import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Login";


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout/>
        },
        {
            path: '/login',
            element: <Login/>
        }])

export default router;
