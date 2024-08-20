import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@/src/app/grapql/actions/getUser.action';

const useUser = () => {
  const { loading, data } = useQuery(GET_USER);
  return {
    loading,
    user: data?.getLoggedInUser?.user,
  };
};

export default useUser;
