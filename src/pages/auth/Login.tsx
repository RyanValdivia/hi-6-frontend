import { Link } from "react-router-dom";
import InputLabel from "../../components/ui/InputLabel";
import { z } from "zod";
import { useAppDispatch } from "../../redux/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginThunkSpring } from "../../redux/thunks/auth.thunk";

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
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="shadow px-12 py-10 rounded text-center">
                <h1 className="text-4xl mb-8 font-bold">Log in</h1>
                <p className="text-sm text-muted">Enter your email and password to log in</p>
                <div className="flex flex-col gap-5 mt-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <InputLabel {...register("email")}  type="email" placeholder="Email" label="E-mail" />
                        {errors.email && <span className="text-sm font-semibold text-danger">{errors.email.message}</span>}
                    
                        <InputLabel {...register("password")} type="password" placeholder="Password" label="Password" />
                        {errors.password && <span className="text-sm font-semibold text-danger">{errors.password.message}</span>}

                        <button className="bg-primary text-basic-inverted rounded py-2.5">Log in</button>
                    </form>
                </div>
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
