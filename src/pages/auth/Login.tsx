import { Link } from "react-router-dom";
import InputLabel from "../../components/ui/InputLabel";
import { z } from "zod";
import { useAppDispatch } from "../../redux/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginThunkSpring } from "../../redux/thunks/auth.thunk";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

function Login() {
    const dispatch = useAppDispatch();
    const loginSchema = z.object({
        email: z.string().email({ message: "El correo electrónico no es válido." }),
        password: z.string().min(8, { message: "La contraseña debe tener al menos 6 caracteres." }),
    });
    type FormData = z.infer<typeof loginSchema>;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = (data: FormData) => {
        console.log(data);
        dispatch(loginThunkSpring(data));
    };
    function googleLoginSuccess(credentialResponse: CredentialResponse) {
        const decoded: any = jwtDecode(credentialResponse.credential!);
        dispatch(loginThunkSpring({ email: decoded.email, password: decoded.sub }));
    }
    function googleLoginError() {
        toast.error("Ocurrio un error al intentar registrarse con Google");
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="shadow px-12 py-10 rounded text-center">
                <h1 className="text-4xl mb-8 font-bold">Log in</h1>
                <p className="text-sm text-muted">Enter your email and password to log in</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-8">
                    <InputLabel {...register("email")} type="email" placeholder="Email" label="E-mail" />
                    {errors.email && <span className="text-sm font-semibold text-danger">{errors.email.message}</span>}

                    <InputLabel {...register("password")} type="password" placeholder="Password" label="Password" />
                    {errors.password && <span className="text-sm font-semibold text-danger">{errors.password.message}</span>}

                    <button className="bg-primary text-basic-inverted rounded py-2.5">Log in</button>
                </form>
                <div className="flex  my-2 w-full justify-around items-center">
                    <div className=" w-full border mx-2 my-4 h-0 relative"></div>
                    <p>or</p>
                    <div className="w-full border mx-2 my-4 h-0 relative"></div>
                </div>
                <GoogleLogin width={300} onSuccess={googleLoginSuccess} onError={googleLoginError} />
                <p className="mt-4 text-sm">
                    Don't have an account?
                    <Link to="/register" className="ml-2 text-primary">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
