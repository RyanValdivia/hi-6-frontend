import { AiFillTags, AiOutlinePaperClip } from "react-icons/ai";
import { useAppSelector } from "../../redux/hooks";

function HomePage() {
    const { userData } = useAppSelector((state) => state.authReducer);
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
                <h1 className="text-primary text-2xl font-semibold">People you may know</h1>
                <div>
                    {
                        //TODO people you may know
                    }
                </div>
                <hr className="my-4" />
            </div>
            <div className="w-1/3 flex flex-col gap-8 h-screen ">
                <div className="rounded h-1/2 shadow border p-8"> 
                    <h1 className="text-primary text-xl font-semibold mb-2">Your Online Friends</h1>
                    <hr />
                    <div>
                        {
                            userData?.friends ? userData?.friends.map((friend, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <img className="rounded-full w-10 h-10" src={friend.imageURL} alt="" />
                                    <h1>{friend.names}</h1>
                                </div>
                            )) : <h1 className="mt-2 text-muted">No friends Available</h1>
                        }
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