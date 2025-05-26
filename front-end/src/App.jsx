import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { UserContextProvider } from "./contexts/UserContext";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Place from "./pages/Place";
import Register from "./pages/register";

axios.defaults.baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "https://clonebnb-oja4.onrender.com/api";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account/:subpage?/:action?/:id?"
            element={<Account />}
          />
          <Route path="/place/:id" element={<Place />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
