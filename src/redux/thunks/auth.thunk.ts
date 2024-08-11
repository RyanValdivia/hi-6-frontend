import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getCookie } from "../../utils/cookies";

const apiUrl = import.meta.env.VITE_BASE_URL;
export const loginThunkSpring = createAsyncThunk("auth/loginThunkSpring", async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
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
        return {
            accessToken: data.token,
        };
    }
});
export const registerThunkSpring = createAsyncThunk("auth/registerThunkSpring", async ({ names, surnames, email, password, imageUrl, description }: { names: string; surnames: string; email: string; password: string; imageUrl: string; description: string }, { rejectWithValue }) => {
    const authGenerate = await fetch(apiUrl + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ names, password, email, surnames, imageUrl, description }),
    });
    if (!authGenerate.ok) {
        toast.error("Error al registrar usuario");
        return rejectWithValue("Error al registrar usuario");
    }
    const response = await authGenerate.json();
    return {
        accessToken: response.token,
    };
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
        return {
            accessToken: token,
            userData: data,
        };
    }
);
