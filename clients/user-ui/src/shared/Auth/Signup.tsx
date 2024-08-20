'use client';

import styles from '@/src/utils/style';
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { z } from 'zod';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '@/src/app/grapql/actions/register.action';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long!'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long!'),
  phone_number: z
    .number()
    .min(11, 'Phone number must be at least 11 characters long!'),
});

type SignUpSchema = z.infer<typeof formSchema>;

const Signup = ({
  setActivateState,
}: {
  setActivateState: (e: string) => void;
}) => {
  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await registerUserMutation({
        variables: data,
      });
      console.log(response);
      localStorage.setItem(
        'activation_token',
        response.data.register.activation_token
      );
      toast.success('Please check your email to verify your email!');
      reset();
      setActivateState('Verification');
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <div>
      <br />
      <h1 className={`${styles.title}`}>Sign up with Kulbatsky</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full relative mb-3">
          <label className={`${styles.label}`}>Enter your name:</label>
          <input
            {...register('name')}
            type="text"
            placeholder="John"
            className={`${styles.input}`}
          />
        </div>
        <label className={`${styles.label}`}>Enter your email address:</label>
        <input
          {...register('email')}
          type="email"
          placeholder="xxxxxx@mail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-600 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}
        <div className="w-full relative mt-3">
          <label className={`${styles.label}`}>Enter your phone number:</label>
          <input
            {...register('phone_number', { valueAsNumber: true })}
            type="number"
            placeholder="+375333333333"
            className={`${styles.input}`}
          />
        </div>
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
          {errors.password && (
            <span className="text-red-600">{`${errors.password.message}`}</span>
          )}
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
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Sign Up"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer mr-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[16px]">
          Already have an account?
          <span
            className="text-[$2190ff] pl-1 cursor-pointer"
            onClick={() => setActivateState('Login')}
          >
            Login
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Signup;
