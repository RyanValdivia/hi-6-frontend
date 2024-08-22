export interface User {
    id: string;
    names: string;
    surnames: string;
    email: string;
    description: string;
    imageURL: string;
    friends: User[];
    friendRequestsSent: FriendRequest[];
    friendRequestsReceived: FriendRequest[];
}
export interface FriendRequest  {
    sender : User;
    receiver : User;
    status: string;
    date : Date;
}