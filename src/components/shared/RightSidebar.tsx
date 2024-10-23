import { ChartContainer } from "@/components/ui/chart";
import { setChartData, setSearchData } from "@/slices/dataSlice";
import { RootState } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bar } from "recharts";
import { chartConfig } from "@/config/chartConfig";
import LeftSideBar from "./LeftSideBar";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateNewEarthQuakeData } from "@/services/postAPI";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { earthquakeSchema } from "@/lib/validations";
import { UpdatedCity } from "@/types/types";
import DeleteSideBar from "../addNewPageComponents/DeleteSideBar";
import { getCountries } from "@/services/getAPI";
import { setId } from "@/slices/searchSlice";

type EarthquakeFormInputs = z.infer<typeof earthquakeSchema>;

const RightSidebar = () => {
  const [updateState, setUpdateState] = useState(false);
  const [showState, setShowState] = useState<boolean>(false);
  const cityId = useSelector((state: RootState) => state.search._id);
  const queryClient = useQueryClient();
  const currentCountry = useSelector(
    (state: RootState) => state.search.currentCountry
  );

  const { data: country } = useQuery<any[]>({
    queryKey: ["cities", currentCountry],
  });

  console.log(country, "data");

  const { mutate } = useMutation({
    mutationFn: (data: {
      update: { date: string; depth: number; magnitude: number }[];
      city: string;
    }) => updateNewEarthQuakeData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities", currentCountry] });
      queryClient.invalidateQueries({ queryKey: ["earthquakes"] });
      queryClient.invalidateQueries({ queryKey: ["average"] });
      setUpdateState(false);
      reset();
      dispatch(setSearchData([...country.cities]));
      dispatch(setId(""));
    },
  });

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const charDatas = useSelector((state: RootState) => state.data.chartDatas);
  const selectedCity = useSelector(
    (state: RootState) => state.data.selectedCity
  );

  // React Hook Form ile form işlevselliği
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EarthquakeFormInputs>({
    resolver: zodResolver(earthquakeSchema),
  });

  const onSubmit = (formData: EarthquakeFormInputs) => {
    const filteredCharDatas = charDatas.map((city) => ({
      date: city.date || "",
      depth: city.depth || 0,
      magnitude: city.magnitude || 0,
    }));

    const updatedEarthquakes = [...filteredCharDatas, formData];

    const updatedCity: UpdatedCity = {
      city: cityId,
      update: updatedEarthquakes,
    };

    mutate(updatedCity);
  };

  // Transform the recentEarthquakes data for the selected city
  const chartData = useMemo(() => {
    return data
      ?.flatMap((country) =>
        country.cities?.filter((city) => city?._id === selectedCity)
      )
      ?.flatMap((city) => city?.recentEarthquakes)
      ?.map((earthquake) => ({
        date: new Date(earthquake.date).toLocaleDateString(),
        magnitude: earthquake.magnitude,
      }));
  }, [data, selectedCity]);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      dispatch(setChartData(chartData));
    }
  }, [chartData, dispatch]);

  return (
    <>
      {!updateState && !showState && (
        <div className="h-[500px] bg-white w-[300px] flex flex-col items-center justify-center p-8 gap-14 absolute top-1/2 -translate-y-1/2 right-5 rounded-lg max-sm:hidden">
          <LeftSideBar />
          {charDatas && charDatas.length > 0 && (
            <ChartContainer config={chartConfig} className="w-full">
              <ResponsiveContainer width="100%">
                <BarChart
                  data={charDatas}
                  role="img"
                  aria-label="Recent earthquake magnitudes"
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="magnitude"
                    fill={chartConfig.desktop.color}
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
          {cityId && (
            <div className="flex items-center gap-2">
              <Button onClick={() => setUpdateState(!updateState)}>
                Update
              </Button>
              <Button onClick={() => setShowState(!showState)}>
                Liste Goruntule
              </Button>
            </div>
          )}
        </div>
      )}

      {updateState && cityId && (
        <div className="h-[500px] bg-white w-[300px] flex flex-col items-center justify-center p-8 gap-14 absolute top-1/2 -translate-y-1/2 right-5 rounded-lg max-sm:hidden">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label>Tarih</label>
              <Input
                type="date"
                {...register("date")}
                className={`input ${errors.date ? "border-red-500" : ""}`}
              />
              {errors.date && (
                <span className="text-red-500">{errors.date.message}</span>
              )}
            </div>

            <div>
              <label>Derinlik</label>
              <Input
                type="number"
                {...register("depth", { valueAsNumber: true })}
                className={`input ${errors.depth ? "border-red-500" : ""}`}
              />
              {errors.depth && (
                <span className="text-red-500">{errors.depth.message}</span>
              )}
            </div>

            <div>
              <label>Büyüklük</label>
              <Input
                type="number"
                step="0.1"
                {...register("magnitude", { valueAsNumber: true })}
                className={`input ${errors.magnitude ? "border-red-500" : ""}`}
              />
              {errors.magnitude && (
                <span className="text-red-500">{errors.magnitude.message}</span>
              )}
            </div>

            <Button className="w-full" type="submit">
              Guncelle
            </Button>
          </form>
        </div>
      )}

      {showState && cityId && <DeleteSideBar setShowState={setShowState} />}
    </>
  );
};

export default RightSidebar;
