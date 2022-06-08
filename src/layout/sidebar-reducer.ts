import { Dispatch } from "react";
import { Menu } from '../../api/menus';

export type StateType = 'INITIAL' | 'FETCHING_MENUS' | 'FETCHING_MENUS_SUCCESS' | 'FETCHING_MENUS_ERROR';

export interface State {
  type: StateType;
  menus?: Array<Menu>;
  error?: string;
}

export type ActionType = 'INITIALIZE' | 'FETCH_MENUS' | 'FETCH_MENUS_SUCCESS' | 'FETCH_MENUS_ERROR';

export interface ActionPayload {
  menus?: Array<Menu>;
  error?: string;
}

export interface Action {
  type: ActionType;
  payload: ActionPayload;
}

export const initialState: State = {
  type: 'INITIAL',
  error: ''
};

interface Config {
  fetchMenus: (token: string) => void;
  token: string;
}

export function reducer(
  state: State, 
  action: Action,
): State {
  /**
   * Action logging for development purpose
   */
  // console.log('action: ', action);

  switch(action.type) {
    case 'INITIALIZE':
      return {
        ...state,
      };
    case 'FETCH_MENUS':
      return {
        ...state,
        type: 'FETCHING_MENUS',
      };
    case 'FETCH_MENUS_SUCCESS':
      return {
        ...state,
        menus: action.payload.menus,
        type: 'FETCHING_MENUS_SUCCESS',
      };
    case 'FETCH_MENUS_ERROR':
      return {
        ...state,
        type: 'FETCHING_MENUS_ERROR'
      };
    default:
      return state;
  }
};

export function onStateChange(state: State, dispatch: Dispatch<Action>, config: Config) {
  switch (state.type) {
    case 'INITIAL':
      dispatch({
        type: 'FETCH_MENUS',
        payload: {
          error: '',
        },
      });
      break;
    case 'FETCHING_MENUS':
      config.fetchMenus(config.token);
      break;
    case 'FETCHING_MENUS_SUCCESS':
      break;
    case 'FETCHING_MENUS_ERROR':
      break;
    default:
      break;
  }
}
