import { createSlice } from "@reduxjs/toolkit";
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { User } from "../../Interfaces/User";
import { friendRequestSentThunk, getUserDataThunk, loginThunkSpring, logoutThunk, registerThunkSpring } from "../thunks/auth.thunk";
interface AuthState {
    isAuth: boolean;
    success: boolean;
    loading: boolean;
    error: RejectedActionFromAsyncThunk<never> | null;
    userData: User | null;
    accessToken: string | null;
    isExpired: boolean | null;
}
let initialState: AuthState = {
    isAuth: false,
    success: false,
    loading: false,
    error: null,
    userData: null,
    accessToken: null,
    isExpired: null,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserDataThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload.userData;
            state.isAuth = true;
            state.success = true;
            state.accessToken = action.payload.accessToken!;
        });
        builder.addCase(getUserDataThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(loginThunkSpring.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginThunkSpring.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.accessToken = action.payload.accessToken;
            state.isAuth = true;
            state.isExpired = false;
        });
        builder.addCase(loginThunkSpring.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(registerThunkSpring.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerThunkSpring.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.accessToken = action.payload.accessToken;
            state.isAuth = true;
            state.isExpired = false;
        });
        builder.addCase(registerThunkSpring.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(logoutThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.loading = false;
            state.isAuth = false;
            state.accessToken = null;
            state.userData = null;
        });
        builder.addCase(logoutThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //reducer for sent friend request
        builder.addCase(friendRequestSentThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(friendRequestSentThunk.fulfilled, (state, action) => {
            state.loading = false;
            if (state.userData !== null) {
                state.userData.friendRequestsSent = action.payload!;
            }
        });
        builder.addCase(friendRequestSentThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
