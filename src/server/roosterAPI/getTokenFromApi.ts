import api from 'axios';
import settings from '../../settings';
import { apiRequest } from './apiRequest';

interface ITokenRequest {
  accessKey: string;
  accessPassword: string;
}

interface ITokenResponse {
  token: string;
}

export async function getTokenFromApi(): Promise<string> {
  const { identity: { accessKey, password } } = settings;
  const requestBody: ITokenRequest = { accessKey, accessPassword: password };
  const response = await apiRequest<ITokenResponse>(api.post, `/auth`, requestBody);
  return response.token;
}
