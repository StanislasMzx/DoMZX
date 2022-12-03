import { useQuery } from "react-query";
import apiClient from "../http-common";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Users() {
  const [errorMessage, setErrorMessage] = useState("An error occurred");
  const fetchUsers = async () => {
    return await apiClient.get("/api/users_list");
  };
  const {
    isLoading,
    data: users,
    isError,
  } = useQuery("usersList", fetchUsers, {
    onError: (error) => setErrorMessage(error?.response?.data?.msg),
  });

  if (isLoading) {
    return (
      <div className="hidden">
        {toast.loading("Chargement...", { id: "usersListLoading" })}
      </div>
    );
  }
  toast.dismiss("usersListLoading");
  if (isError) {
    return (
      <div className="hidden">
        {toast.error(errorMessage, { id: "usersListError" })}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Utilisateur
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mot de passe
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Droits
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date d'expiration
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users?.data.map((person) => (
                  <tr key={person.username}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={person.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="animate-pulse text-sm text-gray-900">
                        <div className="rounded-full bg-slate-200 h-4 w-100"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full " +
                          (person.rights === "temp"
                            ? "bg-red-100 text-red-800"
                            : person.rights === "admin"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-green-100 text-green-800")
                        }
                      >
                        {person.rights}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person?.expiration || "never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        onClick={() =>
                          toast.error("Fonctionnalité pas encore disponible")
                        }
                        className="text-yellow-400 hover:text-yellow-500 cursor-default"
                      >
                        Modifier
                      </a>
                    </td>
                  </tr>
                ))}
                <tr className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="rounded-full bg-slate-200 h-4 w-100"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="rounded-full bg-slate-200 h-4 w-100"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="rounded-full bg-slate-200 h-4 w-100"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      onClick={() =>
                        toast.error("Fonctionnalité pas encore disponible")
                      }
                      className="text-yellow-400 hover:text-yellow-500 cursor-default"
                    >
                      Ajouter
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
