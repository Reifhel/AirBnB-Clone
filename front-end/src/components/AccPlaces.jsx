import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlusIcon from "./Icons/PlusIcon";
import NewPlace from "./NewPlace";

const AccPlaces = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/places/owner");
      setPlaces(data);
    };

    axiosGet();
  }, [action]);

  return (
    <div className="flex w-full max-w-7xl flex-col items-center">
      {action !== "new" ? (
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/account/places/new"
            className="hover:bg-primary-500 bg-primary-400 flex min-w-44 cursor-pointer gap-2 rounded-full px-4 py-2 text-white"
          >
            <PlusIcon className={"size-6"} />
            Adicionar novo lugar
          </Link>

          {places.map((place) => (
            <Link
              to={`/account/places/new/${place._id}`}
              key={place._id}
              className="flex flex-row items-center gap-6 rounded-2xl bg-gray-100 p-6"
            >
              <img
                src={place.photos[0]}
                className="aspect-square max-w-56 rounded-2xl object-center"
                alt="Foto da Acomodação"
              />
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-medium">{place.title}</p>
                <p>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <NewPlace />
      )}
    </div>
  );
};

export default AccPlaces;
