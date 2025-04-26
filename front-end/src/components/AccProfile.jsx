import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const AccProfile = ({ user, setUser }) => {
  //if (!user) return <></>;
  const [redirect, setRedirect] = useState(false);
  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/users/logout");
      console.log(data);

      setUser(null);
      setRedirect(true);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="flex flex-col gap-4">
      <p>
        Logado como {user?.name} ({user?.email})
      </p>

      <button
        onClick={handleLogout}
        className="bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default AccProfile;
