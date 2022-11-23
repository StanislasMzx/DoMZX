import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import apiClient from "../http-common";
import { TrashIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

export default function TimerList() {
  const queryClient = useQueryClient();
  const fetchCron = async () => {
    return await apiClient.get("/api/timer_list");
  };
  const { isLoading, data: cron, isError } = useQuery("timerList", fetchCron);
  const deleteCron = async (clickCronId) => {
    return await apiClient.post("/api/timer_delete", {
      cronId: clickCronId,
    });
  };
  const deleteCronMutation = useMutation(deleteCron, {
    onError: (error, variable, contexte) =>
      console.error(error?.response?.data?.msg),
    onSuccess: (data, variable, contexte) => {
      queryClient.invalidateQueries("timerList");
    },
  });

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>An error occurred</>;
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
                    Minute
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hour
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date of the month
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Month
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Day of the week
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Command
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only"></span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cron?.data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.minute}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.hour}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.day_of_month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.day_of_week}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a
                        className="text-yellow-400 hover:text-yellow-500 cursor-default"
                        target="_blank"
                        href={
                          "https://crontab.guru/#" +
                          item.minute +
                          "_" +
                          item.hour +
                          "_" +
                          item.day_of_month +
                          "_" +
                          item.month +
                          "_" +
                          item.day_of_week
                        }
                      >
                        <code>
                          {item.equipment_name}{" "}
                          {item.force === "1"
                            ? "ON"
                            : item.force === "0"
                            ? "OFF"
                            : ""}
                        </code>
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* <a className="text-yellow-400 hover:text-yellow-500 cursor-default">
                        Edit
                      </a> */}
                      <TrashIcon
                        className="h-6 w-6 text-yellow-700"
                        onClick={() =>
                          toast.promise(
                            deleteCronMutation.mutateAsync(item.cron_id),
                            {
                              loading: "Loading...",
                              error: "An error occurred",
                              success: "Task deleted",
                            }
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
