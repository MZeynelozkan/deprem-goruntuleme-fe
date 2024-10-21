import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// Dinamik import ile bileşenleri yüklüyoruz
const MainPage = lazy(() => import("./pages/mainPage/MainPage"));
const Layout = lazy(() => import("./Layout"));
const AddNewPage = lazy(() => import("./pages/addNewPage/AddNewPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/add-new-country-and-city" element={<AddNewPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
