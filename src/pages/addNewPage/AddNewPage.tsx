import { useEffect } from "react";
import { toast } from "react-hot-toast"; // React Hot Toast'u içe aktar
import LeafMapReverseGeoCoding from "@/components/leaflet/LeafMapReverseGeoCoding";
import RightSidebar from "../../components/addNewPageComponents/RightSideBar";

const AddNewPage = () => {
  useEffect(() => {
    // Sayfa yüklendiğinde toast mesajını göster
    toast(
      "Yalnızca olmayan şehirleri ekleyebilirsiniz. Var olan bir şehri güncellemek için önceki sayfaya dönün.",
      {
        icon: "⚠️", // İsteğe bağlı ikon
      }
    );
  }, []); // Boş bağımlılık dizisi ile yalnızca bir kez çalışır

  return (
    <>
      <LeafMapReverseGeoCoding />
      <RightSidebar />
    </>
  );
};

export default AddNewPage;
