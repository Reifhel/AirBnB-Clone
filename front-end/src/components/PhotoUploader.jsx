import axios from "axios";
import React from "react";
import StarIcon from "./Icons/StarIcon";
import TrashIcon from "./Icons/TrashIcon";
import UploadIcon from "./Icons/UploadIcon";

const PhotoUploader = ({ photoLink, setPhotoLink, setPhotos, photos }) => {
  const uploadByLink = async (e) => {
    e.preventDefault();

    if (photoLink) {
      try {
        const { data: filename } = await axios.post("/places/upload/link", {
          link: photoLink,
        });

        setPhotos((prevValue) => [...prevValue, filename]);
        console.log("imagem enviada");
      } catch (error) {
        alert(
          "Deu erro ao tentar dar upload na foto por link",
          JSON.stringify(error),
        );
      }
    } else {
      alert("Não link a ser enviado!");
    }
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const { files } = e.target;
    const formData = new FormData();
    const filesArray = [...files];

    filesArray.forEach((file) => formData.append("files", file));
    try {
      const { data: urlArray } = await axios.post("places/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPhotos((prevValue) => [...prevValue, ...urlArray]);
    } catch (error) {
      alert("Deu erro ao tentar dar upload na foto", JSON.stringify(error));
    }
    // console.log(filesArray);
    // console.log(formData);
  };

  const deletePhoto = (fileURL) => {
    const newPhotos = photos.filter((photo) => photo != fileURL);

    setPhotos(newPhotos);
  };

  const promotePhoto = (fileURL) => {
    const newPhotos = [fileURL, ...photos.filter((photo) => photo != fileURL)];

    setPhotos(newPhotos);
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
          <div className="relative" key={photo}>
            <img
              className="aspect-square rounded-2xl object-cover"
              src={`${photo}`}
              alt="Imagens do lugar"
            />

            <div className="absolute right-2 bottom-2 flex gap-1">
              <div
                className="hover:bg-primary-400 cursor-pointer rounded-full bg-gray-100 p-1 opacity-75 transition hover:text-white"
                onClick={() => promotePhoto(photo)}
              >
                <StarIcon className={"size-6"} />
              </div>
              <div
                className="hover:bg-primary-400 cursor-pointer rounded-full bg-gray-100 p-1 opacity-75 transition hover:text-white"
                onClick={() => deletePhoto(photo)}
              >
                <TrashIcon className={"size-6"} />
              </div>
            </div>
          </div>
        ))}

        <label
          htmlFor="file"
          className="flex aspect-square cursor-pointer items-center justify-center gap-2 border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          <input
            type="file"
            id="file"
            className="hidden"
            multiple
            onChange={uploadPhoto}
          ></input>
          <UploadIcon className={"size-6"} /> Fazer Upload
        </label>
      </div>
    </div>
  );
};

export default PhotoUploader;
