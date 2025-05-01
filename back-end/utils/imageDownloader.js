import download from "image-downloader";
import mime from "mime-types";

export const downloadImage = async (link, destination) => {
  const mimeType = mime.lookup(link);
  const contentType = mime.contentType(mimeType);
  const extesion = mime.extension(contentType);

  const filename = `${Date.now()}.${extesion}`;
  const fullPath = `${destination}/${filename}`;

  const option = {
    url: link,
    dest: fullPath, //"../tmp/photo.jpg",
  };

  try {
    await download.image(option);
    return filename;
    // console.log("Saved to", filename);
  } catch (err) {
    throw err;
  }
};
