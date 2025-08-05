import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/apis';
import { FileFolder } from '@/lib/enums';

export interface UploadFileData {
  file: File;
  folderName: FileFolder;
}

const uploadFile = async (data: UploadFileData) => {
  const formData = new FormData();
  formData.append('file', data.file);

  const response = await api
    .url(`/file/uploadImage/${data.folderName}`)
    .post(formData)
    .text();
  return response;
};

export const useUploadFile = (
  mutationArgs: UseMutationOptions<any, any, UploadFileData, any>,
) => {
  return useMutation({
    mutationFn: (data: UploadFileData) => uploadFile(data),
    ...mutationArgs,
  });
};
