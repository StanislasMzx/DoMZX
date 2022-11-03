import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import axios from "axios";

import Notification from "../components/Notification";

export default function Login() {
  const nav = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(
        "/api/login",
        {
          username: data.username,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        nav("/");
      })
      .catch((err) => {
        setLoginError(err.response.data.msg);
      });
  };

  return (
    <>
      <div className="flex h-screen min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
                  htmlFor="email"
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
                  {errors.username && (
                    <Notification
                      type={
                        <ExclamationCircleIcon
                          className="h-6 w-6 text-red-500"
                          aria-hidden="true"
                        />
                      }
                      message="Username field is required!"
                    />
                  )}
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
                  {errors.password && (
                    <Notification
                      type={
                        <ExclamationCircleIcon
                          className="h-6 w-6 text-red-500"
                          aria-hidden="true"
                        />
                      }
                      message="Password field is required!"
                    />
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  Log in
                </button>
                {loginError && (
                  <Notification
                    type={
                      <ExclamationCircleIcon
                        className="h-6 w-6 text-red-500"
                        aria-hidden="true"
                      />
                    }
                    message={loginError}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
