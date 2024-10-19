import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import Layout from "./Layout";
import AddNewPage from "./pages/addNewPage/AddNewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/add-new-country-and-city" element={<AddNewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
