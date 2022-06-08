import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '../../api/global';
import { fetchValidateSession, ValidateSessionResponse } from '../../api/auth';
import LoadingScreen from '../loading/LoadingScreen';

interface Props {
  children: ReactNode;
}

interface State {
  status: 'IDLE' | 'FETCHING' | 'SUCCESS' | 'ERROR';
  session: 'UNDEFINED' | 'VALID' | 'INVALID';
}

const initialState: State = {
  status: 'IDLE',
  session: 'UNDEFINED',
};

export default function AuthProtection(props: Props) {
  const router = useRouter();
  const [state, setState] = React.useState(initialState);
  const validateSession = useMutation(fetchValidateSession, {
    onError: (error: AxiosError<ErrorResponse>, _variables, _context) => {
      setState({
        status: 'ERROR',
        session: 'INVALID',
      });
      router.replace('/auth/login');
    },
    onSuccess: (_res: AxiosResponse<ValidateSessionResponse>, _variables, _context) => {
      setState({
        status: 'SUCCESS',
        session: 'VALID',
      });
    },
  });

  React.useEffect(() => {
    validateSession.mutate();
  }, []);

  return (
    <>
      {state.status === 'IDLE' && <LoadingScreen />}
      {state.status === 'FETCHING' && <LoadingScreen />}
      {state.status === 'SUCCESS' &&
        <>
          {state.session === 'VALID' && props.children}
        </>
      }
      {state.status === 'ERROR' && null}
    </>
  );
}
