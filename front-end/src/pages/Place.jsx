import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationMarkerIcon from "../components/Icons/LocationMarkerIcon";
import PlusIcon from "../components/Icons/PlusIcon";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [overlay, setOverlay] = useState(false);

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

  if (!place) return <></>;

  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-8">
        {/* TITLE HEADER */}
        <div className="flex flex-col gap-1">
          <div className="text-3xl font-bold">{place.title}</div>
          <div className="flex gap-1">
            <LocationMarkerIcon className="size-6" />
            <p>{place.city}</p>
          </div>
        </div>

        {/* IMAGE GRID */}
        <div className="relative grid aspect-[3/2] grid-cols-[2fr_1fr] grid-rows-2 gap-4 overflow-hidden rounded-2xl">
          {place.photos
            .filter((photo, index) => index < 3)
            .map((photo, index) => (
              <img
                className={`${index === 0 ? "row-span-2 h-full" : ""} aspect-square w-full cursor-pointer object-cover transition hover:opacity-75`}
                src={photo}
                alt="Imagem da acomodação"
                onClick={() => setOverlay(true)}
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
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Descrição</p>
              <p>{place.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">Horários e Restrições</p>
              <div>
                <p>Check-In: {place.checkIn}</p>
                <p>Check-out: {place.checkOut}</p>
                <p>Nº máximo de convidados: {place.guests}</p>
              </div>
            </div>
          </div>

          <div className="justify-self-center"> Reservas</div>
        </div>

        {/* EXTRAS */}
        <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-6">
          <p className="text-2xl font-bold">Informações Extras</p>
          <p>{place.extras}</p>
        </div>

        {/* OVERLAY */}
        <div
          className={`${overlay ? "flex" : "hidden"} fixed inset-0 items-start overflow-y-auto bg-black text-white`}
          onClick={() => setOverlay(false)}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 py-8">
            <div className="grid aspect-[3/2] grid-cols-2 grid-rows-2 gap-4">
              {place.photos.map((photo) => (
                <img
                  className={`aspect-square w-full object-cover`}
                  src={photo}
                  alt="Imagem da acomodação"
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
