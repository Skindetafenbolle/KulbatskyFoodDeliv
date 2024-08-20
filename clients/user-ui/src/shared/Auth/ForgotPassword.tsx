import styles from '@/src/utils/style';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { FORGOT_PASSWORD } from '@/src/app/grapql/actions/forgot-password.action';

const formSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof formSchema>;

const ForgotPassword = ({
  setActivateState,
}: {
  setActivateState: (e: string) => void;
}) => {
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const response = await forgotPassword({
        variables: {
          email: data.email,
        },
      });
      toast.success('Please check your email address!');
      reset();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <br />
      <h1 className={`${styles.title}`}>Forgot your password?</h1>
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

        <br />
        <br />
        <input
          type="submit"
          value="Send recovery link"
          disabled={isSubmitting || loading}
          className={`${styles.button} mt-3`}
        />
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[16px]">
          Or go back to
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

export default ForgotPassword;
