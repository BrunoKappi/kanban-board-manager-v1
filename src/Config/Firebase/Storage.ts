import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Firebase_Storage } from "./Config";

//@ts-ignore
export const UploadFileToFirebase = async (file: any, path: string): Promise<string> => {
  const storageRef = ref(Firebase_Storage, path);
  const uploadTask = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadTask.ref);
  return downloadURL;
};
