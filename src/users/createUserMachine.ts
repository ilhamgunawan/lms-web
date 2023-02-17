import { createMachine } from 'xstate';

export type CreateUserEvent =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_ERROR' }

export type CreateUserTypestates =
  | { value: 'idle', context: unknown }
  | { value: 'fetchingCreateUserPending', context: unknown }
  | { value: 'fetchingCreateUserSucceed', context: unknown }
  | { value: 'fetchingCreateUserFailed', context: unknown }

const createUserMachine = createMachine<unknown, CreateUserEvent, CreateUserTypestates>({
  id: 'login',
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH_START: {
          target: 'fetchingCreateUserPending',
        },
      },
    },
    fetchingCreateUserPending: {
      on: {
        FETCH_SUCCESS: {
          target: 'fetchingCreateUserSucceed',
        },
        FETCH_ERROR: {
          target: 'fetchingCreateUserFailed',
        },
      },
    },
    fetchingCreateUserSucceed: {
      type: 'final',
    },
    fetchingCreateUserFailed: {
      on: {
        FETCH_START: {
          target: 'fetchingCreateUserPending',
        },
      },
    },
  },
});

export { createUserMachine };
