import api from 'axios';
import settings from '../../settings';
import { IRoosterHeaders } from './models';
import { HttpMethods } from 'anux-exchange';

export async function apiRequest<T>(method: HttpMethods,
  url: string, dataOrToken?: {} | string, token?: string): Promise<T> {

  try {
    const data = dataOrToken != null && typeof (dataOrToken) === 'object' ? dataOrToken : undefined;
    token = token || (dataOrToken != null && typeof (dataOrToken) === 'string' ? dataOrToken : undefined);

    const { services: { roosterApi } } = settings;
    url = `${roosterApi}${url}`;

    const headers: IRoosterHeaders = {
      'Content-Type': 'application/json',
      'x-access-token': token || null,
    };
    const response = await api.request({
      method: HttpMethods.toString(method),
      url,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.error(error);
    throw error;
  }
}
