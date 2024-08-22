import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function PublicLayout() {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const [cookies] = useCookies();
    useEffect(() => {
        if (cookies.accessToken) {
            console.log("Access token found");
            navigate("/u");
        }
    }, [navigate]);
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
