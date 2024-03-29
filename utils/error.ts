import { AxiosError } from "axios";

export const messages = {
  general: 'Something went wrong, please try again',
  networkIssue: 'Please check your internet connection and try again',
};

/**
 * Get error message from error object
 * @param err unknown
 * @returns string
 */
export function getErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    return getAxiosErrorMessage(err);
  } else if (err instanceof Error) {
    return err.message && typeof err.message === 'string' ? err.message : messages.general
  } else {
    return '';
  }
}

function getAxiosErrorMessage(err: AxiosError<any>): string {
  let message = messages.general;

  if (err.response?.data) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const data = err.response.data;

    if (data && data.message && typeof data.message === 'string') {
      message = data.message;
    }

  } else if (err.code) {
    
    if (err.code === 'ERR_NETWORK') {
      message = messages.networkIssue;
    }

  } else {
    // Something happened in setting up the request that triggered an Error
    message = err.message;
  }

  return message;
}

export type ReportParams = {
  message: string
  service?: string
  submitError?: boolean
}
/**
 * Print the error(s) to the console, and optionally submit error to server
 * @param params - error parameters
 * @example reportError({ 
 * message: "Oh no, there is an error :(", 
 * service: "MyServiceProvider", // optional
 * submitError: false, // optional: default false
 * })
 * @returns void
 */
export function reportError(param: ReportParams): void {
  console.log({
    message: param.message,
    service: param.service,
  });
  if (param.submitError) {
    // do something
  }
}
