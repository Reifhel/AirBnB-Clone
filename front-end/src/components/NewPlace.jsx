import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import UploadIcon from "./Icons/UploadIcon";
import Perks from "./Perks";

const NewPlace = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      title &&
      city &&
      // photos.length > 0 &&
      description &&
      price &&
      checkIn &&
      checkOut &&
      guests
    ) {
      try {
        console.log("Todos estão preenchidos");
        const newPlace = await axios.post("/places", {
          title,
          city,
          photos,
          description,
          perks,
          extras,
          price,
          checkIn,
          checkOut,
          guests,
        });
        console.log(newPlace);
        setRedirect(true);
      } catch (error) {
        console.error(JSON.stringify(error));
        alert("Erro ao tentar gerar um novo lugar!");
      }
    } else {
      alert("Campos obrigatórios estão faltantes");
    }
  };

  if (redirect) return <Navigate to="/account/places" />;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 px-8">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="ml-2 text-2xl font-bold">
          {" "}
          Titulo{" "}
        </label>
        <input
          type="text"
          id="title"
          placeholder="Digite o titulo do seu anuncio"
          className="rounded-full border border-gray-300 px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="ml-2 text-2xl font-bold">
          {" "}
          Cidade e País{" "}
        </label>
        <input
          type="text"
          id="city"
          placeholder="Digite a cidade e o país da sua acomodação"
          className="rounded-full border border-gray-300 px-4 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="photoLink" className="ml-2 text-2xl font-bold">
          {" "}
          Fotos{" "}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="photoLink"
            placeholder="Adicione uma foto por seu link"
            className="grow rounded-full border border-gray-300 px-4 py-2"
            value={photos}
            onChange={(e) => setPhotos(e.target.value)}
          />
          <button className="cursor-pointer rounded-full border border-gray-300 bg-gray-100 px-4 py-2 transition hover:bg-gray-200">
            Enviar Foto
          </button>
        </div>

        <div className="mt-2 grid grid-cols-5 gap-4">
          <label
            htmlFor="file"
            className="flex aspect-square cursor-pointer items-center justify-center gap-2 border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200"
          >
            <input type="file" id="file" className="hidden"></input>
            <UploadIcon className={"size-6"} /> Fazer Upload
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="ml-2 text-2xl font-bold">
          {" "}
          Descrição{" "}
        </label>
        <textarea
          id="description"
          placeholder="Digite a descrição da sua acomodação"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="perks" className="ml-2 text-2xl font-bold">
          {" "}
          Comodidades{" "}
        </label>
        <Perks perks={perks} setPerks={setPerks} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="extras" className="ml-2 text-2xl font-bold">
          {" "}
          Informações extras{" "}
        </label>
        <textarea
          id="extras"
          placeholder="Digite as informações extras da sua acomodação"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="ml-2 text-2xl font-bold">Restriçõs e Preços</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-6">
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="price">
              Preço
            </label>
            <input
              type="number"
              id="price"
              placeholder="Ex: R$1000.00"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkIn">
              Horário de Check In
            </label>
            <input
              type="text"
              id="checkIn"
              placeholder="16:00"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkOut">
              Horário de Check Out
            </label>
            <input
              type="text"
              id="checkOut"
              placeholder="16:00"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="guests">
              N° Convidados
            </label>
            <input
              type="number"
              id="guests"
              placeholder="4"
              className="rounded-full border border-gray-300 px-4 py-2"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className="hover:bg-primary-500 bg-primary-400 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white">
        Salvar Informações
      </button>
    </form>
  );
};

export default NewPlace;
