import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import Nav from "./components/Nav";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path="main" element={<MainPage />}></Route>
          <Route path=":movieId" element={<DetailPage />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
