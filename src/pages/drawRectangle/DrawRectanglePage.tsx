import DrawRectangle from "@/components/leaflet/DrawRectangle";
import { getAllCities } from "@/services/getAPI";
import { useQuery } from "@tanstack/react-query";

const DrawRectanglePage = () => {
  const { data: cities } = useQuery<any[]>({
    queryKey: ["citys"],
    queryFn: () => getAllCities(),
  });

  return <DrawRectangle cities={cities} />;
};

export default DrawRectanglePage;
