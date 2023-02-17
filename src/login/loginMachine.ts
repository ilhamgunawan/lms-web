import { createMachine } from 'xstate';

export type LoginEvent =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_ERROR' }

export type LoginTypestates =
  | { value: 'idle', context: unknown }
  | { value: 'fetchingLoginPending', context: unknown }
  | { value: 'fetchingLoginSucceed', context: unknown }
  | { value: 'fetchingLoginFailed', context: unknown }

const loginMachine = createMachine<unknown, LoginEvent, LoginTypestates>({
  id: 'login',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH_START: {
          target: 'fetchingLoginPending',
        },
      },
    },
    fetchingLoginPending: {
      on: {
        FETCH_SUCCESS: {
          target: 'fetchingLoginSucceed',
        },
        FETCH_ERROR: {
          target: 'fetchingLoginFailed',
        },
      },
    },
    fetchingLoginSucceed: {
      type: 'final',
    },
    fetchingLoginFailed: {
      on: {
        FETCH_START: {
          target: 'fetchingLoginPending',
        },
      },
    },
  },
});

export { loginMachine };
