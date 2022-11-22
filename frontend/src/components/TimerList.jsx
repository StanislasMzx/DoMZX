import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function TimerList({ reload }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cron, setCron] = useState({});

  useEffect(() => {
    const getCron = async () => {
      try {
        const response = await axios.post("/api/timer_list");
        setCron(response?.data);
      } catch (err) {
        console.error(err?.response);
      }
      setIsLoading(false);
    };
    getCron();
  }, [setIsLoading, setCron]);

  if (isLoading) {
    return <>{reload}</>;
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cron.map((item, index) => (
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
