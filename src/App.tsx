import LeafletMap from "./components/leaflet/LeafletMap";
import LeftSideBar from "./components/shared/LeftSideBar";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <LeafletMap />
      </div>
    </div>
  );
}

export default App;
