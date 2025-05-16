import React from "react";
import { Link } from "react-router-dom";

const Item = ({ place }) => {
  return (
    <Link to="/" className="flex flex-col gap-2">
      <img
        className="aspect-square rounded-2xl object-cover"
        src={place.photos[0]}
        alt="Imagem da locação"
      />
      <div>
        <h3 className="text-xl font-semibold">{place.city}</h3>
        <p className="truncate text-gray-600">{place.description}</p>
      </div>
      <p>
        <span className="font-semibold">R$ {place.price}</span> por noite
      </p>
    </Link>
  );
};

export default Item;
