import axios from "axios";
import React from "react";
import UploadIcon from "./Icons/UploadIcon";

const PhotoUploader = ({ photoLink, setPhotoLink, setPhotos, photos }) => {
  const uploadByLink = async (e) => {
    e.preventDefault();

    if (photoLink) {
      const { data: filename } = await axios.post("/places/upload/link", {
        link: photoLink,
      });

      setPhotos((prevValue) => [...prevValue, filename]);
      console.log("imagem enviada");
    } else {
      alert("Não link a ser enviado!");
    }
  };

  return (
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
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          onClick={uploadByLink}
          className="cursor-pointer rounded-full border border-gray-300 bg-gray-100 px-4 py-2 transition hover:bg-gray-200"
        >
          Enviar Foto
        </button>
      </div>

      <div className="mt-2 grid grid-cols-5 gap-4">
        {photos.map((photo) => (
          <img
            key={photo}
            className="aspect-square rounded-2xl object-cover"
            src={`${axios.defaults.baseURL}/tmp/${photo}`}
            alt="Imagens do lugar"
          />
        ))}

        <label
          htmlFor="file"
          className="flex aspect-square cursor-pointer items-center justify-center gap-2 border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          <input type="file" id="file" className="hidden"></input>
          <UploadIcon className={"size-6"} /> Fazer Upload
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
