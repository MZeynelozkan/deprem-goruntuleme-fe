import DrawRectangle from "@/components/leaflet/DrawRectangle";
import { getAllCities } from "@/services/getAPI";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const DrawRectanglePage = () => {
  const { data: cities } = useQuery<any[]>({
    queryKey: ["citys"],
    queryFn: () => getAllCities(),
  });

  // Sayfa yüklendiğinde bildirim göster
  useEffect(() => {
    toast(
      "Haritanın istediğiniz bölgesine tıklayın. İlk tıklamada başlangıç noktası, ikinci tıklamada bitiş noktası alarak dikdörtgen çizin. Kalan aralıklardaki şehirleri göreceksiniz.",
      {
        duration: 5000, // Bildirim 5 saniye boyunca gösterilecek
      }
    );
  }, []);

  return (
    <>
      <Toaster /> {/* Toast bildirimlerini göstermek için eklenir */}
      <DrawRectangle cities={cities} />
    </>
  );
};

export default DrawRectanglePage;
