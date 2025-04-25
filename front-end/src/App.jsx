import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Register user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
