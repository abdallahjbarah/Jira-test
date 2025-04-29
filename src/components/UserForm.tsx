import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Input } from '@/components/form/Input';
import { userSchema, type UserFormData } from '@/lib/validations';
import { userService } from '@/lib/api';

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UserFormData) => userService.updateUser('current', data),
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <Input
        label='Name'
        registration={register('name')}
        error={errors.name?.message}
      />
      <Input
        label='Email'
        type='email'
        registration={register('email')}
        error={errors.email?.message}
      />
      <Input
        label='Password'
        type='password'
        registration={register('password')}
        error={errors.password?.message}
      />
      <button
        type='submit'
        disabled={mutation.isPending}
        className='w-full rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700'
      >
        {mutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
