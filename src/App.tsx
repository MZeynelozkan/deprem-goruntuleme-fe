import LeafletMap from "./components/leaflet/LeafletMap";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        {/* <LeftSideBar /> */}
        <LeafletMap />;{/* <RightSidebar /> */}
      </div>
    </div>
  );
}

export default App;
