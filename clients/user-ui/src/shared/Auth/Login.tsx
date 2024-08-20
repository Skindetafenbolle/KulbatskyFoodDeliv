import styles from '@/src/utils/style';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import Cookies from 'js-cookie';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/src/app/grapql/actions/login.action';
import { signIn } from 'next-auth/react';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long!'),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = ({
  setActivateState,
  setOpen,
}: {
  setActivateState: (e: string) => void;
  setOpen: (e: boolean) => void;
}) => {
  const [Login, { loading }] = useMutation(LOGIN_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      const response = await Login({
        variables: loginData,
      });
      if (response.data.Login.user) {
        toast.success('Login successful!');
        Cookies.set('refresh_token', response.data.Login.refreshToken);
        Cookies.set('access_token', response.data.Login.accessToken);
        setOpen(false);
        reset();
        window.location.reload();
      } else {
        toast.error(response.data.Login.error.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    reset();
  };

  return (
    <div>
      <br />
      <h1 className={`${styles.title}`}>Login with Kulbatsky</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="w-full mt-5">
          <span
            className={`${styles.label} text-[#4740ca] block text-right cursor-pointer`}
            onClick={() => setActivateState('Forgot-Password')}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="Login"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-white">
          Or join with
        </h5>
        <div
          className="flex items-center justify-center my-3"
          onClick={() => signIn()}
        >
          <FcGoogle size={30} className="cursor-pointer mr-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[16px]">
          Not have any account?
          <span
            className="text-[$2190ff] pl-1 cursor-pointer"
            onClick={() => setActivateState('Signup')}
          >
            Sign up
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Login;
