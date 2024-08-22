import { User } from "../Interfaces/User";

function ProfilePhoto({ userData }: { userData: User }) {
    return userData?.imageURL ? <img className="grid size-10 place-content-center rounded-lg bg-gray-100 " src={userData?.imageURL} alt="" /> : <span className={"grid size-10 place-content-center rounded-lg text-md bg-gray-100 font-bold text-gray-600"}>{userData?.names.charAt(0)}</span>;
}

export default ProfilePhoto;
