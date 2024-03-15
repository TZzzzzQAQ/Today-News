import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
import GeekLayout from "@/pages/Layout";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";


const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <AuthRoute><GeekLayout/></AuthRoute>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/article',
                    element: <Article/>
                },
                {
                    path: '/publish',
                    element: <Publish/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login/>
        }])

export default router;
