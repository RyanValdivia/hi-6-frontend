import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/public/ErrorPage.tsx";
import HomePage from "./pages/public/HomePage.tsx";
import UserLayout from "./pages/layouts/UserLayout.tsx";
import PublicLayout from "./pages/layouts/PublicLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/u",
        element: <UserLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <Provider store={store}>
            <RouterProvider router={router} />{" "}
        </Provider>
    </CookiesProvider>
);
