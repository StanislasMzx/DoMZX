import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import apiClient from "../http-common";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

export default function Login() {
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();
  const loginInto = async (formData) => {
    return await apiClient.post("/api/login", {
      username: formData.username,
      password: formData.password,
    });
  };
  const loginMutate = useMutation(loginInto, {
    onError: (error, variable, contexte) =>
      console.error(error?.response?.data?.msg),
    onSuccess: (data, variable, contexte) => nav("/"),
  });

  const onSubmit = (data) => {
    toast.promise(loginMutate.mutateAsync(data), {
      loading: "Loading...",
      error: (err) => err?.response?.data?.msg,
      success: "Welcome!",
    });
  };

  return (
    <>
      <div className="flex h-screen min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    name="username"
                    {...register("username", { required: true })}
                    placeholder="Username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  />
                  <div className="hidden"></div>
                </div>
              </div>

              <div className="my-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  Log in
                </button>
                <div className="hidden"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
