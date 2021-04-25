import uploader from "../../database/config/photoConfig";

const photoCreate = async (req) => {
  const tmp = req.files.imageUrl.tempFilePath;
  const imageFile = await uploader.upload(tmp, (_, result) => result);
  console.log(imageFile.url);
  return imageFile.url;
};
export default photoCreate;
