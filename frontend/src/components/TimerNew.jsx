import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import apiClient from "../http-common";
import toast from "react-hot-toast";

export default function TimerNew({ setReload }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const fetchEquipment = async () => {
    return await apiClient.get("/api/equipment_list");
  };
  const {
    isLoading,
    data: equipment,
    isError,
  } = useQuery("equipmentList", fetchEquipment);
  const addCron = async (formData) => {
    return await apiClient.post("/api/timer_new", {
      minute: formData.minute,
      hour: formData.hour,
      day_of_the_month: formData.day_of_the_month,
      month: formData.month,
      day_of_the_week: formData.day_of_the_week,
      equipment_to_trigger: formData.equipment_to_trigger,
    });
  };
  const addCronMutate = useMutation(addCron, {
    onError: (error, variable, contexte) =>
      toast.error(error?.response?.data?.msg),
    onSuccess: (data, variable, contexte) => {
      toast.success("New timer added");
      queryClient.invalidateQueries("timerList");
    },
  });

  const onSubmit = (data) => {
    addCronMutate.mutate(data);
  };

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>An error occurred</>;
  }

  return (
    <form className="space-y-8 divide-y " onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 divide-y  sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Minute
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="minute"
                {...register("minute", {
                  required: true,
                })}
                placeholder="0-59 or *"
                className="max-w-lg block w-full shadow-sm focus:ring-yellow-300 focus:border-yellow-300 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.minute && (
              <p className="text-red-500 text-medium italic">
                This field is required
              </p>
            )}
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Hour
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="hour"
                {...register("hour", { required: true })}
                placeholder="0-23 or *"
                className="max-w-lg block w-full shadow-sm focus:ring-yellow-300 focus:border-yellow-300 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.hour && (
              <p className="text-red-500 text-medium italic">
                This field is required
              </p>
            )}
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Day of the month
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="day_of_the_month"
                {...register("day_of_the_month", { required: true })}
                placeholder="1-31 or *"
                className="max-w-lg block w-full shadow-sm focus:ring-yellow-300 focus:border-yellow-300 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.day_of_the_month && (
              <p className="text-red-500 text-medium italic">
                This field is required
              </p>
            )}
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Month
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="month"
                {...register("month", { required: true })}
                placeholder="1-12 or *"
                className="max-w-lg block w-full shadow-sm focus:ring-yellow-300 focus:border-yellow-300 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.month && (
              <p className="text-red-500 text-medium italic">
                This field is required
              </p>
            )}
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Day of the week
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="day_of_the_week"
                {...register("day_of_the_week", { required: true })}
                placeholder="0-6 or *"
                className="max-w-lg block w-full shadow-sm focus:ring-yellow-300 focus:border-yellow-300 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.day_of_the_week && (
              <p className="text-red-500 text-medium italic">
                This field is required
              </p>
            )}
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Equipment to trigger
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                name="equipment_to_trigger"
                {...register("equipment_to_trigger", { required: true })}
                className="max-w-lg block focus:ring-yellow-300 focus:border-yellow-300 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              >
                {equipment?.data.map((item) => {
                  if (item[0]) {
                    return (
                      <>
                        <option value={item[0].equipmentId}>
                          {item[0].equipmentName}
                        </option>
                        <option value={item[1].equipmentId}>
                          {item[1].equipmentName}
                        </option>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <option value={item.equipmentId + "-on"}>
                          {item.equipmentName} ON
                        </option>
                        <option value={item.equipmentId + "-off"}>
                          {item.equipmentName} OFF
                        </option>
                      </>
                    );
                  }
                })}
              </select>
            </div>
            {errors.equipment_to_trigger && (
              <p className="text-red-500 text-medium italic">
                This field is required
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
