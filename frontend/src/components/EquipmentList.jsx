import { useQuery } from "react-query";
import apiClient from "../http-common";
import toast from "react-hot-toast";
import { useState } from "react";

export default function EquipmentList() {
  const [errorMessage, setErrorMessage] = useState("An error occurred");
  const fetchEquipment = async () => {
    return await apiClient.get("/api/equipment_list");
  };
  const {
    isLoading,
    data: equipment,
    isError,
  } = useQuery("equipmentList", fetchEquipment, {
    onError: (error) => setErrorMessage(error?.response?.data?.msg),
  });

  if (isLoading) {
    return (
      <div className="hidden">
        {toast.loading("Chargement...", { id: "equipmentListLoading" })}
      </div>
    );
  }
  toast.dismiss("equipmentListLoading");
  if (isError) {
    return (
      <div className="hidden">
        {toast.error(errorMessage, { id: "equipmentListError" })}
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
                    Id - Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pin
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dual
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipment?.data.map((item) => {
                  try {
                    return item.map((e) => (
                      <tr key={e.equipmentId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {e.equipmentId} - {e.equipmentName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{e.pin}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {e?.dual || "none"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            onClick={() =>
                              toast.error(
                                "Fonctionnalité pas encore disponible"
                              )
                            }
                            className="text-yellow-400 hover:text-yellow-500 cursor-default"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ));
                  } catch (error) {
                    return (
                      <tr key={item.equipmentId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.equipmentId} - {item.equipmentName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.pin}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={
                              "px-2 inline-flex text-xs leading-5 font-semibold rounded-full " +
                              ((item.equipmentState === "on" &&
                                "bg-green-100 text-green-800") ||
                                (item.equipmentState === "off" &&
                                  "bg-red-100 text-red-800"))
                            }
                          >
                            {item?.equipmentState}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item?.dual?.equipmentId || "none"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            onClick={() =>
                              toast.error(
                                "Fonctionnalité pas encore disponible"
                              )
                            }
                            className="text-yellow-400 hover:text-yellow-500 cursor-default"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    );
                  }
                })}
                <tr className="animate-pulse">
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
                      Add
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
