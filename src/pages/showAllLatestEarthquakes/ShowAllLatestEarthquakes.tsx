import {
  getAllEarthquakesWithCityName,
  getAverageEarthquakeData,
} from "@/services/getAPI";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface EarthquakeData {
  cityName: string;
  date: string;
  magnitude: number;
  depth: number;
  _id: string;
}

interface AvgData {
  averageMagnitude: number; // Ortalama büyüklük
  averageDepth: number; // Ortalama derinlik
}

const ShowAllLatestEarthquakes = () => {
  const navigate = useNavigate();

  const { data: earthquakesStats, isLoading: isLoadingStats } = useQuery<
    EarthquakeData[]
  >({
    queryKey: ["earthquakes"],
    queryFn: getAllEarthquakesWithCityName,
  });

  const { data: avgDataArray, isLoading: isLoadingAvg } = useQuery<AvgData[]>({
    queryKey: ["average"],
    queryFn: getAverageEarthquakeData,
  });

  const handleNavigate = () => {
    navigate(-1);
  };

  // Ortalama değerleri alma
  const avgData = avgDataArray?.[0]; // Eğer sadece bir nesne bekliyorsanız, ilk elemanı alabilirsiniz.
  // Yükleniyor durumunu kontrol et
  if (isLoadingStats || isLoadingAvg) {
    return <div className="p-6 max-w-3xl mx-auto">{<Loader />}</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4">Deprem Listesi</h3>
      <div className="border border-gray-300 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
        <div className="bg-gray-200 font-bold flex">
          <span className="flex-1 p-4 text-left">Şehir</span>
          <span className="flex-1 p-4 text-left">Büyüklük</span>
          <span className="flex-1 p-4 text-left">Derinlik (km)</span>
          <span className="flex-1 p-4 text-left">Tarih</span>
        </div>
        {earthquakesStats?.map((eq: EarthquakeData) => (
          <div key={eq._id} className="flex border-b border-gray-300">
            <span className="flex-1 p-4">{eq.cityName}</span>
            <span className="flex-1 p-4">{Math.floor(eq.magnitude)}</span>{" "}
            {/* Tam sayıya dönüştürüldü */}
            <span className="flex-1 p-4">{Math.floor(eq.depth)}</span>{" "}
            {/* Tam sayıya dönüştürüldü */}
            <span className="flex-1 p-4">
              {new Date(eq.date).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Ortalama Deprem İstatistikleri
        </h3>
        <div className="border border-gray-300 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
          <div className="bg-gray-200 font-bold flex">
            <span className="flex-1 p-4 text-left">Ortalama Büyüklük</span>
            <span className="flex-1 p-4 text-left">Ortalama Derinlik (km)</span>
          </div>
          {avgData ? (
            <div className="flex border-b border-gray-300">
              <span className="flex-1 p-4">
                {Math.floor(avgData.averageMagnitude)}
              </span>{" "}
              {/* Tam sayıya dönüştürüldü */}
              <span className="flex-1 p-4">
                {Math.floor(avgData.averageDepth)}
              </span>{" "}
              {/* Tam sayıya dönüştürüldü */}
            </div>
          ) : (
            <div className="flex border-b border-gray-300">
              <span className="flex-1 p-4">Veri yok</span>
              <span className="flex-1 p-4">Veri yok</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Toplam Deprem Sayısı
        </h3>
        <div className="border border-gray-300 rounded-lg p-4 text-center">
          <span className="text-lg font-bold">
            {earthquakesStats?.length ?? 0} {/* Toplam deprem sayısı */}
          </span>
        </div>
      </div>
      <Button onClick={handleNavigate} className="mt-6">
        Geri Don
      </Button>
    </div>
  );
};

export default ShowAllLatestEarthquakes;
