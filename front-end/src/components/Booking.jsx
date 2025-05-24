import React from "react";
import { Link } from "react-router-dom";

const Booking = ({ booking, place = false }) => {
  return (
    <Link
      to={`/place/${booking.place._id}`}
      className={`flex flex-row items-center gap-6 rounded-2xl bg-gray-100 p-6 ${place ? "cursor-auto" : ""}`}
    >
      {place ? (
        ""
      ) : (
        <img
          src={booking.place.photos[0]}
          className="aspect-square max-w-56 rounded-2xl object-center"
          alt="Foto da Acomodação"
        />
      )}

      <div className="flex flex-col gap-2">
        {place ? (
          <p className="text-2xl font-medium">
            Você já tem uma reserva esse lugar!
          </p>
        ) : (
          <p className="text-2xl font-medium">{booking.place.title}</p>
        )}
        <p>
          <span className="font-bold">Check-in:</span>{" "}
          {new Date(booking.checkIn + "GMT-03:00").toLocaleDateString("pt-br")}
        </p>
        <p>
          <span className="font-bold">Check-out:</span>{" "}
          {new Date(booking.checkOut + "GMT-03:00").toLocaleDateString("pt-br")}
        </p>
        <p>
          <span className="font-bold">Noites: </span> {booking.nights}
        </p>
        <p>
          <span className="font-bold">Nº Convidados: </span> {booking.guests}
        </p>
        <p>
          <span className="font-bold">Valor total: </span> R${" "}
          {booking.total.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default Booking;
