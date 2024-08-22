import { useState, useEffect, useRef } from "react";
import Input from "./ui/InputSearch";
import { AiOutlineBell } from "react-icons/ai";
import { useAppSelector } from "../redux/hooks";
import ProfilePhoto from "./ProfilePhoto";

function GeneralNav() {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const { userData } = useAppSelector((state) => state.authReducer);
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setNotificationsOpen(!setNotificationsOpen);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notificationsRef]);

    return (
        <nav className="shadow flex items-center justify-around w-full px-10 h-16">
            <h1 className="text-4xl font-bold text-basic">HI-6</h1>
            <div className="flex items-center justify-between w-2/3">
                <Input type="text"></Input>
                <div>
                    <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="cursor-pointer relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 ">
                        <AiOutlineBell className="font-bold text-xl" />
                    </button>
                    <div>
                        {notificationsOpen && (
                            <div ref={notificationsRef} className="absolute right-0 top-16 w-60 bg-white shadow-xl rounded-lg border">
                                <h1 className="text-lg bg-primary text-basic-inverted py-2 px-2 font-semibold">Notifications</h1>
                                <div className="px-2">
                                    {userData?.friendRequestsSent.length! > 0 ? (
                                        userData?.friendRequestsSent.map((sent, index) => (
                                            <div key={index} className="">
                                              <ProfilePhoto userData={sent.receiver} />
                                                <h1 className="text-sm">
                                                    {sent.receiver.names} {sent.receiver.surnames}
                                                </h1>
                                            </div>
                                        ))
                                    ) : (
                                        <h1 className="text-muted">No notifications</h1>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default GeneralNav;
