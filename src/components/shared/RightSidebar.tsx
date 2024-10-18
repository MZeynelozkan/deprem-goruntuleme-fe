import { ChartContainer } from "@/components/ui/chart";
import { setChartData } from "@/slices/dataSlice";
import { RootState } from "@/store/store";
import { useEffect, useMemo } from "react";
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

const RightSidebar = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const charDatas = useSelector((state: RootState) => state.data.chartDatas);
  const selectedCity = useSelector(
    (state: RootState) => state.data.selectedCity
  );

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

  console.log("chartData", chartData);

  return (
    <div className=" min-h-dvh bg-white w-[300px] absolute top-0 right-0 flex flex-col items-center justify-center z-50 max-sm:hidden">
      <ChartContainer config={chartConfig} className="w-full m">
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
    </div>
  );
};

export default RightSidebar;
