import { AiFillTags, AiOutlinePaperClip } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { User } from "../../Interfaces/User";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { friendRequestSentThunk } from "../../redux/thunks/auth.thunk";
import ProfilePhoto from "../../components/ProfilePhoto";
const apiUrl = import.meta.env.VITE_BASE_URL;

function HomePage() {
    const { userData, accessToken } = useAppSelector((state) => state.authReducer);
    const [people, setPeople] = useState<User[]>([]);
    const [reload, setReload] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(friendRequestSentThunk());
    }, [reload]);
    useEffect(() => {
        const fetchPeople = async () => {
            const response = await fetch(apiUrl + "/public/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                console.log("Error fetching people");
                return;
            }
            const data = await response.json();
            setPeople(data);
        };
        fetchPeople();
    }, [accessToken]);

    function sendRequest(person: User) {
        const sendRequest = async () => {
            const response = await fetch(apiUrl + "/private/friend/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ receiverEmail: person.email }),
            });
            if (!response.ok) {
                toast.error("Error enviando solicitud de amistad");
                return;
            }
            toast.success("Solicitud de amistad enviada a " + person.names);
            setReload(!reload);
        };
        sendRequest();
    }
    return (
        <div className="flex gap-8">
            <div className="rounded shadow border w-2/3 h-screen p-8">
                <h1 className="text-primary text-2xl font-semibold">Your Feed</h1>
                <h1 className="mb-2">Welcome {userData?.names} this is your feed.</h1>
                <div>
                    <h5 className="mb-2 text-sm text-muted">Write something on your profile...</h5>
                    <textarea className="w-full rounded border-2 p-2 outline-none" name="" id="" maxLength={1200}></textarea>
                    <div className="flex justify-between">
                        <div className="ml-2 flex gap-2">
                            <button>
                                <AiOutlinePaperClip />
                            </button>
                            <button>
                                <AiFillTags />
                            </button>
                        </div>
                        <button className="bg-primary text-basic-inverted px-3 rounded py-1">Post</button>
                    </div>
                </div>
                <div>
                    <div>
                        {
                            //TODO posts
                        }
                    </div>
                </div>
                <hr className="my-4" />
                <h1 className="text-primary text-2xl mb-4 font-semibold">People you may know</h1>
                <div>
                    {people.length > 0 ? (
                        people.map((person, index) => (
                            <div key={index} className="flex w-full gap-4 items-center">
                                <Link to={"public/" + person.id} className="flex w-full items-center gap-2 my-2 rounded shadow px-2 py-3 cursor-pointer">
                                    <ProfilePhoto userData={person} />
                                    <div className="ml-1">
                                        <h1 className="font-semibold text-primary">
                                            {person.names} {person.surnames}
                                        </h1>
                                        <h3 className="text-xs text-muted">{person.email}</h3>
                                    </div>
                                </Link>
                                <button onClick={() => sendRequest(person)} className="rounded text-sm bg-primary text-basic-inverted font-semibold shadow px-2 py-2">
                                    Send Friend Request
                                </button>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-muted">Loading...</h1>
                    )}
                </div>
                <hr className="my-4" />
            </div>
            <div className="w-1/3 flex flex-col gap-8 h-screen ">
                <div className="rounded h-1/2 shadow border p-8">
                    <h1 className="text-primary text-xl font-semibold mb-2">Your Online Friends</h1>
                    <hr />
                    <div>
                        {userData?.friends ? (
                            userData?.friends.map((friend, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <img className="rounded-full w-10 h-10" src={friend.imageURL} alt="" />
                                    <h1>{friend.names}</h1>
                                </div>
                            ))
                        ) : (
                            <h1 className="mt-2 text-muted">No friends Available</h1>
                        )}
                    </div>
                </div>
                <div className="rounded h-1/2 shadow border p-8">
                    <h1 className="text-primary text-xl font-semibold mb-2">Your Groups</h1>
                    <hr />
                    <div>
                        {
                            //TODO groups
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
