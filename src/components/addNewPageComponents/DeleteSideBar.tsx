import { formatDateShort } from "@/lib/utils";
import { getEarthquakesById } from "@/services/getAPI";
import { RootState } from "@/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { Button } from "../ui/button";
import { deleteRecentEarthquakeById } from "@/services/postAPI";

interface Earthquake {
  _id: string;
  date: string;
  magnitude: number;
  depth: number;
}

const DeleteSideBar = ({
  setShowState,
}: {
  setShowState: (value: boolean) => void;
}) => {
  const id = useSelector((state: RootState) => state.search._id);
  const [earthquakeId, setEarthquakeId] = useState<string>("");

  console.log(earthquakeId, "earthquakeId");

  const queryClient = useQueryClient();

  const { data: earthquake } = useQuery({
    queryKey: ["earthquake", id],
    queryFn: () => getEarthquakesById(id),
    enabled: !!id,
  });

  console.log(earthquake, "earthquake");

  const { mutate } = useMutation<
    void,
    unknown,
    { cityId: string; earthquakeId: string }
  >({
    mutationFn: ({ cityId, earthquakeId }) =>
      deleteRecentEarthquakeById(cityId, earthquakeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["earthquake", id] });
      setShowState(false);
    },
  });

  const handleDelete = () => {
    if (earthquakeId) {
      mutate({ cityId: id, earthquakeId });
      setEarthquakeId("");
    }
  };

  return (
    <div>
      {earthquake ? (
        <div className="h-[500px] bg-white w-[300px] flex flex-col items-center p-8 gap-14 absolute top-[250px] right-5 rounded-lg max-sm:hidden">
          <div className="w-full grid grid-cols-3 gap-4 text-center font-bold border-b pb-2">
            <p>Date</p>
            <p>Magnitude</p>
            <p>Depth (km)</p>
          </div>
          <div className="w-full flex flex-col gap-2 overflow-y-auto max-h-[400px]">
            {earthquake.recentEarthquakes.map((earthquake: Earthquake) => (
              <div
                onClick={() => setEarthquakeId(earthquake._id)}
                key={earthquake._id}
                className="grid grid-cols-3 gap-4 text-center border-b py-2 px-2 rounded-sm hover:bg-blue-100"
                data-tooltip-id="tooltip"
                data-tooltip-content="Silmek isterseniz üzerine tıklayın"
              >
                <p>{formatDateShort(earthquake.date)}</p>
                <p>{earthquake.magnitude}</p>
                <p>{earthquake.depth}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}

      {earthquakeId && (
        <div className="h-[500px] bg-white w-[300px] flex flex-col items-center p-8 gap-14 absolute top-[250px] right-5 rounded-lg max-sm:hidden">
          <p className="text-center">
            Bu deprem verisini kaldırmak ister misiniz?
          </p>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowState(false)}>İptal</Button>
            <Button onClick={handleDelete}>Deprem Verisini Sil</Button>
          </div>
        </div>
      )}

      <Tooltip id="tooltip" />
    </div>
  );
};

export default DeleteSideBar;
