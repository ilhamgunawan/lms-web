import { AxiosResponse } from "axios";

export type OnErrorMutation<Request> = (error: unknown, variables: Request, context: unknown) => void;

export type OnErrorQuery = (error: unknown) => void;

export type OnSuccessMutation<Request, Response> = (data: AxiosResponse<Response>, variables: Request, context: unknown) => void;

export type OnSuccessQuery<Response> = (data: AxiosResponse<Response>) => void;

export interface MutationParams<Request, Response> {
  req?: Request
  onError?: OnErrorMutation<Request>
  onSuccess?: OnSuccessMutation<Request, Response>
}

export interface QueryParams<Request, Response> {
  req?: Request
  onError?: OnErrorQuery
  onSuccess?: OnSuccessQuery<Response>
}
