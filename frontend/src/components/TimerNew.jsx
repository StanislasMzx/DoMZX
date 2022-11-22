import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function TimerNew({ setReload }) {
  const [isLoading, setIsLoading] = useState(true);
  const [equipment, setEquipment] = useState({});
  const [validateChanges, setValidateChanges] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getEquipmentList = async () => {
      try {
        const response = await axios.post("/api/equipment_list");
        setEquipment(response.data);
      } catch (err) {
        console.error(err.response);
      }
      setIsLoading(false);
    };
    getEquipmentList();
  }, [setEquipment, setIsLoading]);

  if (isLoading) {
    return <></>;
  }

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/timer_new", {
        minute: data.minute,
        hour: data.hour,
        day_of_the_month: data.day_of_the_month,
        month: data.month,
        day_of_the_week: data.day_of_the_week,
        equipment_to_trigger: data.equipment_to_trigger,
      });
      setValidateChanges(response?.data);
      setReload(true);
    } catch (err) {
      setValidateChanges(err?.response?.data);
    }
  };

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(async (data) => {
        onSubmit(data);
      })}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
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

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
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

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
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

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
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

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
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

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Equipment to trigger
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  name="equipment_to_trigger"
                  {...register("equipment_to_trigger", { required: true })}
                  className="max-w-lg block focus:ring-yellow-300 focus:border-yellow-300 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  {equipment.map((item) => {
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
