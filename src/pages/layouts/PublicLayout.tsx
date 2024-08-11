import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCookies } from "react-cookie";

function PublicLayout() {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const [cookies, setCookie] = useCookies();
    const { accessToken } = useAppSelector((state) => state.authReducer);
    useEffect(() => {
        if (accessToken) {
            console.log("Access token found");
            navigate("/u");
            setCookie("accessToken", accessToken, { path: "/" });
        }
    }, [accessToken, navigate]);
    useEffect(() => {
        if (cookies.accessToken) {
            navigate("/u");
        }
    }, []);
    useEffect(() => {
        if (!url.pathname.includes("login") && !url.pathname.includes("register")) {
            navigate("/login");
        }
    }, [url, navigate]);

    return (
        <>
            <Toaster />
            <Outlet></Outlet>
        </>
    );
}

export default PublicLayout;
