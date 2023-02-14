import { useMutation } from 'react-query';
import { MutationParams } from '../../models/react-query';
import { 
  PostLoginRequest, 
  PostLoginResponse, 
  PostValidateTokenRequest, 
  PostValidateTokenResponse,
} from '../../models/api/auth';
import { postLogin, postValidateToken } from '../api/auth';

export const Login = ({ onError, onSuccess }: MutationParams<PostLoginRequest, PostLoginResponse>) => {
  return useMutation(postLogin, {
    onError,
    onSuccess,
  });
}

export const ValidateToken = ({ onError, onSuccess }: MutationParams<PostValidateTokenRequest, PostValidateTokenResponse>) => {
  return useMutation(postValidateToken, {
    onError,
    onSuccess,
  });
}
