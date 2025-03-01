import { Lock, Mail, User } from "lucide-react";
import React from "react";
import { useGlobalContext } from "../../context";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { loggedInAdmin, setLoggedInAdmin, baseUrl, notify } =
    useGlobalContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => Register(data);

  const Register = async (data: Inputs) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/admin/login`, {
        ...data,
      });
      localStorage.setItem("LSadmin", JSON.stringify(response.data));
      setLoggedInAdmin(response.data);
      notify("you have succesfully logged in ", true);
    } catch (err: any) {
      notify(err.message, false);
      console.error("department Request failed:", err);
    }
  };

  return (
    <div className="h-screen w-[100vw] md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-red-700 to-red-900 i justify-around items-center hidden">
        <div className="flex flex-col place-items-center">
          <div className="hidden md:flex flex-1 justify-center items-center">
            <img
              className="w-[40%] object-cover"
              src="/logo.png"
              alt="Department Logo"
            />
          </div>

          <h1 className="text-white font-semibold text-3xl ">
            Dashboard login
          </h1>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        {/* <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div> */}
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
            Login
          </h1>
          <div className="flex items-center border-2 py-2 px-3 rounded-lg mb-4">
            <Mail />
            <input
              className="pl-2 outline-none border-none p-1 text-lg"
              type="text"
              placeholder="some@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-lg">
            <Lock />
            <input
              className="pl-2 outline-none border-none p-1 text-lg"
              type="password"
              placeholder="Passowrd"
              {...register("password", { required: true })}
            />
            {errors.password && <span>password is required</span>}
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 cursor-pointer rounded-lg text-white font-semibold mb-2"
          >
            Login
          </button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
