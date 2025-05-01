import download from "image-downloader";
import mime from "mime-types";

export const downloadImage = async (link, destination) => {
  const extesion = mime.extension(link);
  const filename = `${Date.now()}.${extesion}`;
  option = {
    url: link,
    dest: `${destination}/${filename}`, //"../tmp/photo.jpg",
  };

  try {
    const { filename } = await download.image(option);
    console.log("Saved to", filename);
  } catch (err) {
    console.error(err);
  }
};
