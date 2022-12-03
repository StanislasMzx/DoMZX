import { LightningBoltIcon } from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "react-query";
import apiClient from "../http-common";
import { toast } from "react-hot-toast";

export default function EquipmentCards({ equipment }) {
  const queryClient = useQueryClient();
  const handleTrigger = async (equipmentId) => {
    await apiClient.post("/api/trigger_equipment", {
      equipmentId: equipmentId,
    });
  };
  const handleTriggerMutate = useMutation(handleTrigger, {
    onError: (error, variable, contexte) =>
      console.error(error?.response?.data?.msg),
    onSuccess: (data, variable, contexte) => {
      queryClient.invalidateQueries("equipmentList");
    },
  });

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {equipment.map((item, index) => (
        <li
          key={index}
          className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
          <div className="flex-1 flex flex-col p-8">
            <h3 className="mt-6 text-gray-900 text-xl font-medium">
              {item[0]
                ? item[0].equipmentName + " - " + item[1].equipmentName
                : item.equipmentName}
            </h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dt className="sr-only">Equipment Id</dt>
              <dd className="text-gray-500 text-sm">
                {item[0]
                  ? item[0].equipmentId + " - " + item[1].equipmentId
                  : item.equipmentId}
              </dd>
              <dt className="sr-only">Equipment State</dt>
              <dd className="mt-3">
                <span
                  className={
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full " +
                    ((item.equipmentState === "on" &&
                      "bg-green-100 text-green-800") ||
                      (item.equipmentState === "off" &&
                        "bg-red-100 text-red-800"))
                  }
                >
                  {item?.equipmentState || ""}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              {item[0] && (
                <div className="w-0 flex-1 flex">
                  <a
                    onClick={() => {
                      toast.promise(
                        handleTriggerMutate.mutateAsync(item[0]?.equipmentId),
                        {
                          loading: "Chargement...",
                          error: "Une erreur est survenue",
                          success: "Séquence déclenchée",
                        },
                        {
                          success: { icon: "🔌" },
                        }
                      );
                    }}
                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 cursor-default"
                  >
                    <LightningBoltIcon
                      className="w-5 h-5 text-yellow-400 mr-3"
                      aria-hidden="true"
                    />
                    {item[0]?.equipmentId ? item[0]?.equipmentName : "Basculer"}
                  </a>
                </div>
              )}
              <div className="-ml-px w-0 flex-1 flex">
                <a
                  onClick={() => {
                    item[1]
                      ? toast.promise(
                          handleTriggerMutate.mutateAsync(item[1]?.equipmentId),
                          {
                            loading: "Chargement...",
                            error: "Une erreur est survenue",
                            success: "Séquence déclenchée",
                          },
                          {
                            success: { icon: "🔌" },
                          }
                        )
                      : toast.promise(
                          handleTriggerMutate.mutateAsync(item?.equipmentId),
                          {
                            loading: "Chargement...",
                            error: "Une erreur est survenue",
                            success: "Séquence déclenchée",
                          },
                          {
                            success: { icon: "🔌" },
                          }
                        );
                  }}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 cursor-default"
                >
                  <LightningBoltIcon
                    className="w-5 h-5 text-yellow-400 mr-3"
                    aria-hidden="true"
                  />
                  {item[1]?.equipmentId ? item[1]?.equipmentName : "Basculer"}
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
