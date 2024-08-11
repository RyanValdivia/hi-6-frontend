import { z } from "zod";
import InputLabel from "../../components/ui/InputLabel";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../redux/hooks";
import { registerThunkSpring } from "../../redux/thunks/auth.thunk";

function Register() {
    const dispatch = useAppDispatch();
    const registerSchema = z
        .object({
            names: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
            surNames: z.string().min(3, { message: "El apellido debe tener al menos 3 caracteres." }),
            email: z.string().email({ message: "El correo electrónico no es válido." }),
            password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
            confirmPassword: z.string().min(6, { message: "La confirmación de la contraseña debe tener al menos 6 caracteres." }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Las contraseñas no coinciden.",
            path: ["confirmPassword"],
        });

    type FormData = z.infer<typeof registerSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: FormData) => {
        interface RegisterData {
            names: string;
            surnames: string;
            email: string;
            password: string;
            imageUrl: string;
            description: string;
        }
        const registerData: RegisterData = {
            names: data.names,
            surnames: data.surNames,
            email: data.email,
            password: data.password,
            imageUrl: "",
            description: "",
        };
        console.log(registerData);
        dispatch(registerThunkSpring(registerData));
    };
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="shadow px-12 py-10 rounded text-center">
                <h1 className="text-4xl mb-4 font-bold">Sign up</h1>
                <p className="text-sm text-muted">Enter your details to create an account</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-8">
                    <div className="flex gap-4">
                        <div>
                            <InputLabel {...register("names")} type="text" placeholder="First Name" label="Names" />
                            {errors.names && <span className="text-sm font-semibold text-danger">{errors.names.message}</span>}
                        </div>
                        <div>
                            <InputLabel {...register("surNames")} type="text" placeholder="Last Name" label="Sur Names" />
                            {errors.surNames && <span className="text-sm font-semibold text-danger">{errors.surNames.message?.toString()!}</span>}
                        </div>
                    </div>
                    <div>
                        <InputLabel {...register("email")} type="email" placeholder="Email" label="E-mail" />
                        {errors.email && <span className="text-sm font-semibold text-danger">{errors.email.message?.toString()!}</span>}
                    </div>
                    <div>
                        <InputLabel {...register("password")} type="password" placeholder="Password" label="Password" />
                        {errors.password && <span className="text-sm font-semibold text-danger">{errors.password.message?.toString()!}</span>}
                    </div>
                    <div>
                        <InputLabel {...register("confirmPassword")} type="password" placeholder="Confirm Password" label="Confirm Password" />
                        {errors.confirmPassword && <span className="text-sm font-semibold text-danger">{errors.confirmPassword.message?.toString()!}</span>}
                    </div>
                    <button type="submit" className="bg-primary text-white rounded py-2.5">
                        Sign up
                    </button>
                </form>
                <p className="mt-4 text-sm">
                    Already have an account?
                    <Link to="/login" className="text-primary">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
