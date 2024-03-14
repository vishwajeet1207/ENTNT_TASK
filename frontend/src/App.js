import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarHeader from "./componets/NavbarHeader";
import HomePage from "./pages/HomePage";
import FilterPage from "./pages/FilterPage";
import ProductPage from "./pages/ProductPage";
import CardPage from "./pages/CardPage";
import SignUp from "./pages/SignUp";
import UserProfle from "./pages/UserProfle";
import CheckOut from "./pages/CheckOut";
import Private from "./componets/Route/Private";
import AdminPrivate from "./componets/Route/AdminPrivate";
import AdminProfile from "./pages/AdminProfile";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <div className="relative">
        <NavbarHeader />
        <Routes>
          <Route path="/user-dashboard" element={<Private />}>
            <Route path="" element={<UserProfle />}></Route>
          </Route>
          <Route path="/checkout" element={<Private />}>
            <Route path="" element={<CheckOut />}></Route>
          </Route>
          <Route path="admin-dashboard" element={<AdminPrivate />}>
            <Route path="" element={<AdminProfile />}></Route>
          </Route>
          <Route path="/card" element={<Private />}>
            <Route path="" element={<CardPage />}></Route>
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
