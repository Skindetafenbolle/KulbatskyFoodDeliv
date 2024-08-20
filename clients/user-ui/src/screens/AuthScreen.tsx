import React, { useState } from 'react';
import Login from '@/src/shared/Auth/Login';
import Signup from '@/src/shared/Auth/Signup';
import Verification from '@/src/shared/Auth/Verification';
import ForgotPassword from '@/src/shared/Auth/ForgotPassword';

const AuthScreen = ({ setOpen }: { setOpen: (e: boolean) => void }) => {
  const [activateState, setActivateState] = useState('Login');
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'screen') {
      setOpen(false);
    }
  };
  return (
    <div
      className="w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000027]"
      id="screen"
      onClick={handleClose}
    >
      <div className="w-[500px] bg-slate-900 rounded shadow-sm p-3">
        {activateState === 'Login' && (
          <Login setActivateState={setActivateState} setOpen={setOpen} />
        )}
        {activateState === 'Signup' && (
          <Signup setActivateState={setActivateState} />
        )}
        {activateState === 'Verification' && (
          <Verification setActivateState={setActivateState} />
        )}
        {activateState === 'Forgot-Password' && (
          <ForgotPassword setActivateState={setActivateState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
