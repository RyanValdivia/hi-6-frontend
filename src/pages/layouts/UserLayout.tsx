import { Navigate, Outlet, useNavigate } from "react-router-dom";
import GeneralNav from "../../components/GeneralNav";
import Footer from "../../components/Footer";
import DashBoard from "../../components/DashBoard";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getUserDataThunk } from "../../redux/thunks/auth.thunk";

function UserLayout() {
    const [cookies, , removeCookie] = useCookies();
    const { userData} = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (userData === null) {
            dispatch(getUserDataThunk({navigate, removeCookie}));
        }
    }, [userData]);

    return cookies.accessToken !== null ? (
        <>
            <GeneralNav></GeneralNav>
            <Toaster />
            <DashBoard></DashBoard>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    ) : (
        <Navigate to="/login" />
    );
}

export default UserLayout;
