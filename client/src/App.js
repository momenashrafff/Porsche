// App.js
import React from 'react';
import {BrowserRouter as Router, createBrowserRouter, Route, RouterProvider, Switch} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import HomeLayout from "./components/HomeLayout";




const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
                // children: [
                //     {
                //         index: true,
                //         element: <EventsPage />,
                //         loader: eventsLoader,
                //     },
                //     {
                //         path: ':eventId',
                //         id: 'event-detail',
                //         loader: eventDetailLoader,
                //         children: [
                //             {
                //                 index: true,
                //                 element: <EventDetailPage />,
                //                 action: deleteEventAction,
                //             },
                //             {
                //                 path: 'edit',
                //                 element: <EditEventPage />,
                //                 action: manipulateEventAction,
                //             },
                //         ],
                //     },
                //     {
                //         path: 'new',
                //         element: <NewEventPage />,
                //         action: manipulateEventAction,
                //     },
                // ],
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
