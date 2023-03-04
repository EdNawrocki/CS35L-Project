import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/Home";
import NewItem from "./routes/NewItem"
import ErrorPage from "./error-page";
/*
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader, } from "./routes/contact";
import EditContact from "./routes/edit"; */

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />
    },
    {
        path: "/routes/NewItem",
        element: <NewItem />,
        errorElement: <ErrorPage />,
        /*loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader,
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
            },
        ],*/
    },
]);

export default function App() {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
        )
}

