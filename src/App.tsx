import LeafletMap from "./components/leaflet/LeafletMap";
import LeftSideBar from "./components/shared/LeftSideBar";
import Navbar from "./components/shared/Navbar";

import RightSidebar from "./components/shared/RightSidebar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <LeafletMap />;
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
