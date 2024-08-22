import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getCookie } from "../../utils/cookies";
import { FriendRequest } from "../../Interfaces/User";
interface CookieSetOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "lax" | "strict" | "none";
}

// Define el tipo de la función setCookie
type SetCookie = (name: string, value: string | object, options?: CookieSetOptions) => void;
const apiUrl = import.meta.env.VITE_BASE_URL;
export const loginThunkSpring = createAsyncThunk("auth/loginThunkSpring", async ({ email, password, setCookie, navigate }: { email: string; password: string; setCookie: SetCookie; navigate: (path: string) => void; }, { rejectWithValue }) => {
    const response = await fetch(apiUrl + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    if (response.status === 401) {
        toast.error("Usuario o contraseña incorrectos");
        return rejectWithValue("Usuario o contraseña incorrectos");
    } else {
        const data = await response.json();
        toast.success("Inicio de sesión exitoso");
        setCookie("accessToken", data.token, { path: "/" });
        navigate("/u");
        return {
            accessToken: data.token,
        };
    }
});
export const registerThunkSpring = createAsyncThunk("auth/registerThunkSpring", async ({ names, surnames, email, password, imageURL, description, setCookie, navigate }: { names: string; surnames: string; email: string; password: string; imageURL: string; description: string; setCookie: SetCookie; navigate: (path: string) => void; }, { rejectWithValue }) => {
    const authGenerate = await fetch(apiUrl + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ names, password, email, surnames, imageURL, description }),
    });
    if (!authGenerate.ok) {
        toast.error("Error al registrar usuario");
        return rejectWithValue("Error al registrar usuario");
    }
    const response = await authGenerate.json();
    setCookie("accessToken", response.token, { path: "/" });
    navigate("/u");
    return {
        accessToken: response.token,
    };
});
// Define el tipo para las opciones de la cookie

export const logoutThunk = createAsyncThunk("auth/logout", async ({ navigate, setCookie, removeCookie }: { navigate: (path: string) => void; setCookie: SetCookie; removeCookie: (name: string) => void }) => {
    setCookie("accessToken", "", { path: "/" });
    removeCookie("accessToken");
    navigate("/login");
    toast.success("Sesión cerrada con éxito");
});
export const getUserDataThunk = createAsyncThunk(
    "data/getUserDataThunk",
    async (
        {
            navigate,
            removeCookie,
        }: {
            navigate: (path: string) => void;
            removeCookie: (name: string) => void;
        },
        { rejectWithValue }
    ) => {
        const token = getCookie("accessToken");
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const response = await fetch(apiUrl + "/private/user", requestOptions);
        if (!response.ok) {
            toast.error("Su sesión ha expirado");
            removeCookie("accessToken");
            navigate("/login");
            return rejectWithValue("Error al obtener datos de usuario");
        }
        const data = await response.json();
        console.log(data);
        return {
            accessToken: token,
            userData: data,
        };
    }
);
export const friendRequestSentThunk = createAsyncThunk("data/friendRequestSentThunk", async () => {
    const token = getCookie("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    const response = await fetch(apiUrl + "/private/friend/sent", requestOptions);
    if (!response.ok) {
        toast.error("Hubo un error al obtener las solicitudes de amistad enviadas");
        return;
    }
    const data: FriendRequest[] = await response.json();
    console.log(data);
    return data;
});
