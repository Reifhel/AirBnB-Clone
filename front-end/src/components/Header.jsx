import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import ListIcon from "./Icons/ListIcon";
import MagnifyingGlassIcon from "./Icons/MagnifyingGlassIcon";
import ProfileIcon from "./Icons/ProfileIcon";

const Header = () => {
  const { user } = useUserContext();
  return (
    <header className="shadow-md">
      <div className="px4 mx-auto flex max-w-7xl items-center justify-between py-4 sm:px-8">
        <Link to="/" className="flex items-center">
          <img
            className="h-10"
            src="https://brandlogos.net/wp-content/uploads/2022/07/airbnb-logo_brandlogos.net_vb6uh.png"
            alt="logo airbnb"
          />
          <p className="text-primary-400 text-2xl font-bold">CloneBnB</p>
        </Link>

        <Link
          to="/"
          className="hidden items-center rounded-full border border-gray-300 py-2 pr-4 pl-6 shadow-md lg:flex"
        >
          <p className="border-r border-r-gray-300 pr-4">Qualquer lugar</p>
          <p className="border-r border-r-gray-300 px-4">Qualquer Semana</p>
          <p className="px-4">Hóspedes</p>

          <div className="bg-primary-400 rounded-full p-2 text-white">
            <MagnifyingGlassIcon className={"size-4"} />
          </div>
        </Link>

        <Link
          to={user ? "/account/profile" : "/login"}
          className="flex items-center gap-2 rounded-full border border-gray-300 py-2 pr-4 pl-6 shadow-md"
        >
          <div>
            <ListIcon className={"size-5 text-gray-600"} />
          </div>

          <div>
            <ProfileIcon className={"size-8 text-gray-600"} />
          </div>
          {user ? (
            <p className="max-w-32 truncate sm:max-w-none">{user.name}</p>
          ) : (
            <></>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
