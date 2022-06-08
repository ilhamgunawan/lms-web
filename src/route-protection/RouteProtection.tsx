import React, { ReactNode, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useToast, Spinner } from '@chakra-ui/react';
import { ErrorResponse } from '../../api/global';
import { CurrentRoleResponse, fetchCurrentRole } from '../../api/auth';
import { reducer, onStateChange, initialState, Protection } from './route-protection-reducer';

type AllowedRoles = 
  | 'admin'
  | 'teacher'
  | 'student';

interface Props {
  children: ReactNode;
  allowedRoles: Array<AllowedRoles>;
}

function validateRoles(roles: Array<AllowedRoles>, currentRole: string): Protection {
  return roles.find(role => role === currentRole) ? 'ACCEPT' : 'DENY';
}

export default function RouteProtection(props: Props) {
  const router = useRouter();
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentRole = useMutation(fetchCurrentRole, {
    onError: (error: AxiosError<ErrorResponse>, _variables, _context) => {
      dispatch({
        type: 'FETCH_CURRENT_ROLE_ERROR',
        payload: {
          protection: 'UNDEFINED',
          error: {
            code: error.response ? error.response.data.code : '',
            message: error.response ? error.response.data.message : '',
          },
        },
      });
    },
    onSuccess: (res: AxiosResponse<CurrentRoleResponse>, _variables, _context) => {
      dispatch({
        type: 'FETCH_CURRENT_ROLE_SUCCESS',
        payload: {
          protection: validateRoles(props.allowedRoles, res.data.role),
          error: {
            code: '',
            message: '',
          },
        },
      });
    },
  });

  const reducerConfig = {
    currentRoleFetcher: () => currentRole.mutate(),
    router: router,
    useToast: toast,
  };

  useEffect(() => {
    onStateChange(state, dispatch, reducerConfig);
  }, [state.type]);

  return (
    <>
      {state.type === 'INITIAL' && <Spinner />}
      {state.type === 'FETCHING_CURRENT_ROLE' && <Spinner />}
      {state.type === 'FETCHING_CURRENT_ROLE_SUCCESS' &&
        <>
          {state.payload.protection === 'ACCEPT' && props.children}
          {state.payload.protection === 'DENY' && <h1>DENY</h1>}
          {state.payload.protection === 'UNDEFINED' && <h1>UNDEFINED</h1>}
        </>
      }
      {state.type === 'FETCHING_CURRENT_ROLE_ERROR' && <h1>ERROR</h1>}
    </>
  );
}
