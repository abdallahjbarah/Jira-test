import { api } from '@lib/apis';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type PostContactUsData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const postContactUs = async (
  data: PostContactUsData,
): Promise<PostContactUsData> => {
  const response = await api.url('/users/contact-form').post(data);
  return response.json();
};

export const usePostContactUs = (
  mutationOptions: UseMutationOptions<
    PostContactUsData,
    Error,
    PostContactUsData
  >,
) => {
  return useMutation({
    mutationFn: postContactUs,
    ...mutationOptions,
  });
};
