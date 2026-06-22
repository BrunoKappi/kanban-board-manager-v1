import { UploadFileToFirebase } from "@/Config/Firebase/Storage";

export const dbUploadFile = (file: any, path: string): Promise<string> => {
  return UploadFileToFirebase(file, path);
};
