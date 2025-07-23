import axios, { AxiosError } from 'axios';
import { HttpStatusCode } from 'axios';

export const isClientRequestError = (error: AxiosError): boolean =>
  error.response?.status !== undefined &&
  error.response.status >= HttpStatusCode.BadRequest &&
  error.response.status < HttpStatusCode.InternalServerError;

export const isServerError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error) &&
  error.response?.status !== undefined &&
  error.response.status >= HttpStatusCode.InternalServerError;
