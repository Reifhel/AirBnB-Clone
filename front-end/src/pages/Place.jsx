import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LocationMarkerIcon from "../components/Icons/LocationMarkerIcon";
import PlusIcon from "../components/Icons/PlusIcon";
import { useUserContext } from "../contexts/UserContext";
import { getPerkIcon } from "../dummy-perks";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const { user } = useUserContext();

  useEffect(() => {
    if (id) {
      const axiosGet = async () => {
        const { data } = await axios.get(`/places/${id}`);
        setPlace(data);
      };

      axiosGet();
    }
  }, [id]);

  useEffect(() => {
    overlay
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [overlay]);

  const handleBooking = (e) => {
    e.preventDefault();

    if (checkIn && checkOut && guests) {
      console.log("Fez uma reserva");
    } else {
      alert("Preencha todos os campos antes de fazer a reserva!");
    }
  };

  if (!place) return <></>;

  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4 sm:gap-8 sm:p-8">
        {/* TITLE HEADER */}
        <div className="flex flex-col sm:gap-1">
          <div className="text-xl font-bold sm:text-3xl">{place.title}</div>
          <div className="flex gap-1">
            <LocationMarkerIcon className="size-6" />
            <p>{place.city}</p>
          </div>
        </div>

        {/* IMAGE GRID */}
        <div className="relative grid aspect-square gap-4 overflow-hidden rounded-2xl sm:aspect-[3/2] sm:grid-cols-[2fr_1fr] sm:grid-rows-2">
          {place.photos
            .filter((photo, index) => index < 3)
            .map((photo, index) => (
              <img
                className={`${index === 0 ? "row-span-2 h-full object-center" : ""} aspect-square w-full cursor-pointer transition hover:opacity-75 sm:object-cover`}
                src={photo}
                alt="Imagem da acomodação"
                onClick={() => setOverlay(true)}
                key={index}
              />
            ))}
          <div
            className="absolute right-2 bottom-2 flex cursor-pointer gap-2 rounded-2xl border border-black bg-white px-2 py-1 transition hover:scale-105"
            onClick={() => setOverlay(true)}
          >
            <PlusIcon className="size-6" />
            <p>Mostrar mais imagens</p>
          </div>
        </div>

        {/* COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="order-2 flex flex-col gap-5 p-6 md:order-none">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">Descrição</p>
              <p>{place.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">
                Horários e Restrições
              </p>
              <div>
                <p>Check-In: {place.checkIn}</p>
                <p>Check-out: {place.checkOut}</p>
                <p>Nº máximo de convidados: {place.guests}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">Diferênciais</p>
              <div className="flex flex-col gap-2">
                {place.perks.map((perk) => (
                  <div className="flex items-center gap-2" key={perk}>
                    {getPerkIcon(perk)}
                    <p> {perk} </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form className="order-1 flex flex-col gap-4 self-center justify-self-center rounded-2xl border border-gray-200 px-4 py-3 sm:px-8 sm:py-4 md:order-none">
            <p className="text-center text-lg font-bold sm:text-2xl">
              Preço: R${place.price} por noite
            </p>

            {/* CHECK IN & CHECK OUT */}
            <div className="flex flex-col sm:flex-row">
              <div className="rounded-tl-2xl rounded-tr-2xl border border-gray-300 px-4 py-2 sm:rounded-tr-none sm:rounded-bl-2xl">
                <p className="font-bold">Check-in</p>
                <input
                  type="date"
                  value={checkIn}
                  className="w-full sm:w-auto"
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="rounded-br-2xl rounded-bl-2xl border border-gray-300 px-4 py-2 sm:rounded-tr-2xl sm:rounded-bl-none">
                <p className="font-bold">Check-out</p>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* N Convidados */}
            <div className="flex flex-col gap-2 rounded-2xl border border-gray-300 px-4 py-2">
              <p className="font-bold">Nº de Convidados</p>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder={place.guests}
                className="rounded-2xl border border-gray-300 px-4 py-2"
              />
            </div>

            {user ? (
              <button
                onClick={handleBooking}
                className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-center font-bold text-white"
              >
                Reservar
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-center font-bold text-white"
              >
                Faça seu login
              </Link>
            )}
          </form>
        </div>

        {/* EXTRAS */}
        <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-6">
          <p className="text-lg font-bold sm:text-2xl">Informações Extras</p>
          <p>{place.extras}</p>
        </div>

        {/* OVERLAY */}
        <div
          className={`${overlay ? "flex" : "hidden"} fixed inset-0 items-start overflow-y-auto bg-black text-white`}
          onClick={() => setOverlay(false)}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-8">
            <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-2">
              {place.photos.map((photo) => (
                <img
                  className={`aspect-square w-full object-cover opacity-100`}
                  src={photo}
                  alt="Imagem da acomodação"
                  key={photo}
                />
              ))}
            </div>
          </div>

          <button
            className="absolute top-2 right-4 aspect-square w-8 cursor-pointer rounded-full bg-white font-bold text-black transition hover:scale-105"
            onClick={() => setOverlay(false)}
          >
            X
          </button>
        </div>
      </div>
    </section>
  );
};

export default Place;
