import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { ValidateToken } from '../../services/react-query/auth';
import LoadingScreen from '../loading/LoadingScreen';
import GeneralErrorScreen from '../error/GeneralErrorScreen';

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
  const validateSession = ValidateToken({
    onError: () => {
      setState({
        status: 'ERROR',
        session: 'INVALID',
      });
      router.replace('/auth/login');
    },
    onSuccess: () => {
      setState({
        status: 'SUCCESS',
        session: 'VALID',
      });
    },
  });

  React.useEffect(() => {
    validateSession.mutate({ token: window.localStorage.getItem('token') ?? '' });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch(state.status) {
    case 'IDLE':
      return <LoadingScreen />;
    case 'FETCHING':
      return <LoadingScreen />;
    case 'SUCCESS':
      switch(state.session) {
        case 'VALID':
          return <>{props.children}</>;
        default:
          return null;
      }
    case 'ERROR':
      return (
        <GeneralErrorScreen 
          title="Something wen't wrong" 
          body='Please try again' 
          onRetry={() => validateSession.mutate({ token: window.localStorage.getItem('token') ?? '' })} 
        />
      );
    default:
      return null;
  }
}
