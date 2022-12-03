import { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, HomeIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import apiClient from "../http-common";
import { useQuery, useMutation } from "react-query";
import toast from "react-hot-toast";

export default function NavBar() {
  const nav = useNavigate();
  const [openProfileSettings, setOpenProfileSettings] = useState(false);
  const fetchUser = async () => {
    return await apiClient.get("/api/whoami");
  };
  const { isLoading, data: user, isError } = useQuery("userInfo", fetchUser);
  const handleLogout = async () => {
    return await apiClient.post("/api/logout");
  };
  const handleLogoutMutate = useMutation(handleLogout, {
    onError: (error, variable, contexte) =>
      console.error(error?.response?.data?.msg),
    onSuccess: (data, variable, contexte) => nav("/login"),
  });

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>An error occurred</>;
  }

  const navigation = [
    { name: "Maison", href: "/" },
    { name: "Timer", href: "/timer" },
    { name: "Historique", href: "/logs" },
  ];
  const userNavigation = [
    {
      name: "Mon profil",
      action: () => {
        setOpenProfileSettings(!openProfileSettings);
      },
    },
    ...(user?.data?.rights === "admin"
      ? [{ name: "Paramètres", action: () => nav("/settings") }]
      : []),
    {
      name: "Se déconnecter",
      action: () => {
        toast.promise(
          handleLogoutMutate.mutateAsync(),
          {
            loading: "Chargement...",
            error: "Une erreur est survenue",
            success: "À bientôt",
          },
          {
            success: { icon: "👋" },
          }
        );
      },
    },
  ];

  return (
    <>
      <Profile
        open={openProfileSettings}
        setOpen={setOpenProfileSettings}
        user={user?.data}
        // setUser={setUser}
      />
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white border-b border-gray-200">
          {({ open }) => (
            <>
              <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <HomeIcon
                        className="h-8 w-8 text-yellow-300"
                        aria-hidden="true"
                      />
                      <h1 className="text-xl font-bold text-yellow-300 font-monoton">
                        DoMZX
                      </h1>
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={(nav) =>
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" +
                            (nav.isActive
                              ? " border-yellow-300 text-gray-900"
                              : " inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium")
                          }
                          aria-current={(nav) => {
                            nav.isActive ? "page" : undefined;
                          }}
                          end
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user?.data?.username}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user?.data?.rights}
                      </div>
                    </div>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.data?.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  onClick={item.action}
                                  className={
                                    "block px-4 py-2 text-sm text-gray-700 cursor-default" +
                                    (active ? " bg-gray-100" : "")
                                  }
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button as="div" key={item.name}>
                      <NavLink
                        to={item.href}
                        className={(nav) =>
                          "block pl-3 pr-4 py-2 border-l-4 text-base font-medium " +
                          (nav.isActive
                            ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800")
                        }
                        aria-current={(nav) =>
                          nav.isActive ? "page" : undefined
                        }
                        end
                      >
                        {item.name}
                      </NavLink>
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user?.data?.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user?.data?.username}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user?.data?.rights}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        onClick={item.action}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-default"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
