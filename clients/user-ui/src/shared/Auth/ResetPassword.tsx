'use client';
import styles from '../../utils/style';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '@/src/app/grapql/actions/reset-password.action';

const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long!'),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

type ResetPasswordSchema = z.infer<typeof formSchema>;

const ResetPassword = ({
  activationToken,
}: {
  activationToken: string | string[];
}) => {
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const response = await resetPassword({
        variables: {
          password: data.password,
          activationToken: activationToken,
        },
      });
      toast.success('Password reset successful!');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="md:w-[500px] w-full">
        <br />
        <h1 className={`${styles.title}`}>Reset Your Password </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className={`${styles.label}`}>
              Enter your password
            </label>
            <input
              {...register('password')}
              type={!show ? 'password' : 'text'}
              placeholder="qwerty12345"
              className={`${styles.input}`}
            />

            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-600 block mt-1">{`${errors.password.message}`}</span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className={`${styles.label}`}>
              Enter your confirm password
            </label>
            <input
              {...register('confirmPassword')}
              type={!confirmPasswordShow ? 'password' : 'text'}
              placeholder="qwerty12345"
              className={`${styles.input}`}
            />

            {!confirmPasswordShow ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setConfirmPasswordShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setConfirmPasswordShow(false)}
              />
            )}
          </div>
          {errors.confirmPassword && (
            <span className="text-red-600 block mt-1">{`${errors.confirmPassword.message}`}</span>
          )}
          <br />
          <input
            type="submit"
            value="Reset Password"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
          <br />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
