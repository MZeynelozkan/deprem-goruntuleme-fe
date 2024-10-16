import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bar } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const RightSidebar = () => {
  const data = useSelector((state: RootState) => state.data.data);
  const selectedCity = useSelector(
    (state: RootState) => state.data.selectedCity
  );

  // Transform the recentEarthquakes data for the selected city
  const chartData = data
    ?.flatMap((country) =>
      country.cities?.filter((city) => city?._id === selectedCity)
    )
    ?.flatMap((city) => city?.recentEarthquakes)
    ?.map((earthquake) => ({
      date: new Date(earthquake.date).toLocaleDateString(),
      magnitude: earthquake.magnitude,
    }));

  console.log("chartData", chartData);

  return (
    <div
      style={{ backgroundColor: "#1e3a8a " }}
      className=" min-h-dvh w-[300px] absolute top-0 right-0 flex flex-col items-center justify-center z-50"
    >
      <ChartContainer config={chartConfig} className="w-full m">
        <ResponsiveContainer width="100%">
          <BarChart
            data={chartData}
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
