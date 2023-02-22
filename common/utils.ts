import appConfig from '../config.json';
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiBookOpen,
} from 'react-icons/fi';
import { AxiosError } from 'axios';

export interface Config {
  siteName: string;
};

type GetConfig = () => Config;

export const getConfig: GetConfig = () => {
  const config: Config = {
    siteName: appConfig.siteName,
  };
  return config;
};

export const getIcon = (name: string) => {
  switch(name) {
    case 'Dashboard':
      return FiHome;
    case 'User Management':
      return FiUsers;
    case 'Roles':
      return FiUserCheck;
    case 'Course Management':
      return FiBookOpen;
    default:
      return FiHome;
  }
};

const generalErrorMessage = 'Something went wrong, please try again';
const networkError = 'Please check your internet connection and try again';

export function getMessageFromError(error: unknown): string {
  if (!error) return '';

  if (error instanceof AxiosError) {
    // console.log('error', error);

    if (error.code === 'ERR_NETWORK') return networkError;

    if (error.response?.data) {
      const data = error.response.data;

      if (typeof data.message === 'string') return data.message;

      return generalErrorMessage;
    }

    return generalErrorMessage;
  }

  return generalErrorMessage;
}
