import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/loader/Loader";
import ShowAllLatestEarthquakes from "./pages/showAllLatestEarthquakes/ShowAllLatestEarthquakes";
import { Toaster } from "react-hot-toast";
import DrawRectanglePage from "./pages/drawRectangle/DrawRectanglePage";

// Dinamik import ile bileşenleri yüklüyoruz
const MainPage = lazy(() => import("./pages/mainPage/MainPage"));
const Layout = lazy(() => import("./Layout"));
const AddNewPage = lazy(() => import("./pages/addNewPage/AddNewPage"));

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route
                path="/add-new-country-and-city"
                element={<AddNewPage />}
              />
              <Route path="/draw-rectangle" element={<DrawRectanglePage />} />
            </Route>
            <Route
              path="/show-latest-earthquakes"
              element={<ShowAllLatestEarthquakes />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
