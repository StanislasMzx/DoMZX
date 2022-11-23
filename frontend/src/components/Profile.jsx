import { Fragment } from "react";
import { useMutation, useQueryClient } from "react-query";
import apiClient from "../http-common";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Profile({ open, setOpen, user }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const modifyProfile = async (formData) => {
    return await apiClient.post("/api/modify_profile", {
      imageUrl: formData.imageUrl,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });
  };
  const modifyProfileMutate = useMutation(modifyProfile, {
    onError: (error, variable, contexte) =>
      console.error(error?.response?.data?.msg),
    onSuccess: (data, variable, contexte) => {
      queryClient.invalidateQueries("userInfo");
      setOpen(!open);
    },
  });

  const onSubmit = (data) => {
    toast.promise(modifyProfileMutate.mutateAsync(data), {
      loading: "Loading...",
      error: (err) => err?.response?.data?.msg,
      success: "Changes have been saved",
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Profile settings
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <form
                      className="space-y-8 divide-y divide-gray-200"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <img src={user.imageUrl} alt="user avatar" />
                          </span>{" "}
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                Avatar URL
                              </span>
                              <input
                                type="text"
                                name="imageUrl"
                                {...register("imageUrl", {
                                  validate: (field) =>
                                    field !== "" || watch("oldPassword") !== "",
                                })}
                                placeholder={user.imageUrl}
                                autoComplete="off"
                                className={
                                  "flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300" +
                                  (errors.imageUrl
                                    ? " border ring-red-500 border-red-500"
                                    : " focus:ring-yellow-300 focus:border-yellow-300")
                                }
                              />
                            </div>
                            {errors.imageUrl && (
                              <p className="text-red-500 text-medium italic">
                                You cannot send an empty form!
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label
                            htmlFor="Password"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Password
                          </label>{" "}
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="mb-6">
                              <input
                                type="password"
                                name="oldPassword"
                                {...register("oldPassword")}
                                placeholder="Current password"
                                className="flex-1 block w-full focus:ring-yellow-300 focus:border-yellow-300 min-w-0 rounded sm:text-sm border-gray-300"
                              />
                            </div>
                            <div className="mb-6">
                              <input
                                type="password"
                                name="newPassword"
                                {...register("newPassword", {
                                  validate: (pwd) =>
                                    watch("oldPassword") === "" ||
                                    pwd.length > 7,
                                })}
                                placeholder="New password"
                                className={
                                  "flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300" +
                                  (errors.confirmPassword
                                    ? " border ring-red-500 border-red-500"
                                    : " focus:ring-yellow-300 focus:border-yellow-300")
                                }
                              />
                              {errors.newPassword && (
                                <p className="text-red-500 text-medium italic">
                                  Old password empty or password too short!
                                </p>
                              )}
                            </div>
                            <div className="mb-6">
                              <input
                                type="password"
                                name="confirmPassword"
                                {...register("confirmPassword", {
                                  validate: (pwd) =>
                                    pwd === watch("newPassword"),
                                })}
                                placeholder="Confirm password"
                                className={
                                  "flex-1 block w-full min-w-0 rounded sm:text-sm border-gray-300" +
                                  (errors.confirmPassword
                                    ? " border ring-red-500 border-red-500"
                                    : " focus:ring-yellow-300 focus:border-yellow-300")
                                }
                              />
                              {errors.confirmPassword && (
                                <p className="text-red-500 text-medium italic">
                                  Passwords do not match!
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
                            onClick={() => {
                              setOpen(!open);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
