/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxHamburgerMenu } from "react-icons/rx";

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "../ui/sheet";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setChartData } from "@/slices/dataSlice";
import { ChartContainer } from "../ui/chart";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "react-leaflet";
import { chartConfig } from "@/config/chartConfig";

const MobileNavbar = () => {
  const charDatas = useSelector((state: RootState) => state.data.chartDatas);
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const selectedCity = useSelector(
    (state: RootState) => state.data.selectedCity
  );

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
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="h-6 w-6 sm:hidden" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center  p-4 space-y-4 ">
        <SheetTitle className="text-xl mt-2.5 font-bold">Stats</SheetTitle>
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
