import { AiOutlineHome, AiOutlineSetting, AiOutlineTeam } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { logoutThunk } from "../redux/thunks/auth.thunk";


function DashBoard() {
    const [, setCookie, removeCookie] = useCookies();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const onLogout = () => {
        dispatch(logoutThunk({navigate, setCookie, removeCookie}));
    }
    const classSelected = "t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700";
    const classNoSelected = "group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    const { userData } = useAppSelector((state) => state.authReducer);
    return (
        <div className="flex h-screen w-16 flex-col justify-between border-e fixed top-0 bg-white">
            <div>
                <div className="inline-flex size-16 items-center justify-center">{userData?.imageURL ? <img className="grid size-10 place-content-center rounded-lg bg-gray-100 " src={userData?.imageURL} alt="" /> : <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-md font-bold text-gray-600">{userData?.names.charAt(0)}</span>}</div>

                <div className="border-t border-gray-100">
                    <div className="px-2">
                        <div className="py-4">
                            <Link to="/u" className={location.pathname.length > 2  ? classNoSelected : classSelected}>
                                <AiOutlineHome />
                                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">General</span>
                            </Link>
                        </div>

                        <ul className="space-y-1 border-t border-gray-100 pt-4">
                            <li>
                                <Link to="/u/friends" className={location.pathname.includes("friends") ? classSelected : classNoSelected}>
                                    <AiOutlineTeam />
                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">Friends</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/u/settings" className={location.pathname.includes("settings") ? classSelected : classNoSelected}>
                                    <AiOutlineSetting/>

                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">Settings</span>
                                </Link>
                            </li>

                            <li>
                                <a href="#" className={location.pathname.includes("billing") ? classSelected : classNoSelected}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>

                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">Invoices</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" className={location.pathname.includes("account") ? classSelected : classNoSelected}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">Account</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                <form action="#">
                    <button onClick={onLogout} type="submit" className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>

                        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">Logout</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DashBoard;
