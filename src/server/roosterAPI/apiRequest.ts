import { AxiosResponse, AxiosRequestConfig } from 'axios';
import settings from '../../settings';
import { IRoosterHeaders } from './models';

export async function apiRequest<T>(method: (url: string, data: {}, options?: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
  url: string, dataOrToken?: {} | string, token?: string): Promise<T> {

  try {
    const data = dataOrToken != null && typeof (dataOrToken) === 'object' ? dataOrToken : undefined;
    token = dataOrToken != null && typeof (dataOrToken) === 'string' ? dataOrToken : undefined;

    const { services: { roosterApi } } = settings;
    url = `${roosterApi}${url}`;

    const headers: IRoosterHeaders = {
      'Content-Type': 'application/json',
      'x-access-token': token || null,
    };

    const response = await method(url, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.error(error);
    return undefined;
  }
}
