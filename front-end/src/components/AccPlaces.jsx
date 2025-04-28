import React from "react";
import { Link, useParams } from "react-router-dom";
import PlusIcon from "./Icons/PlusIcon";
import NewPlace from "./NewPlace";

const AccPlaces = () => {
  const { action } = useParams();
  return (
    <div className="flex w-full max-w-7xl flex-col items-center">
      {action !== "new" ? (
        <Link
          to="/account/places/new"
          className="hover:bg-primary-500 bg-primary-400 flex min-w-44 cursor-pointer gap-2 rounded-full px-4 py-2 text-white"
        >
          <PlusIcon className={"size-6"} />
          Adicionar novo lugar
        </Link>
      ) : (
        <NewPlace />
      )}
    </div>
  );
};

export default AccPlaces;
