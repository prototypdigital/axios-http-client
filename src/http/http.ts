import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpClientConstructor } from 'types/httpClient';

export abstract class HttpClient<Model> {
  private isBaseEndpointSecure: boolean;
  protected client: AxiosInstance;

  constructor(
    { isBaseEndpointSecure = false, baseUrl, endpoint }: HttpClientConstructor,
    config: Omit<AxiosRequestConfig<Model>, 'baseURL'>,
  ) {
    this.isBaseEndpointSecure = isBaseEndpointSecure;
    this.client = axios.create({
      baseURL: this.normalizeUrl(`${baseUrl}/${endpoint}`),
      ...config,
    });
  }

  normalizeUrl(url: string) {
    const splittedUrl = url.split('https://');
    const normalizedUrl = splittedUrl[1].replace(/([\/])\1+/g, '/');

    return this.isBaseEndpointSecure
      ? `https://${normalizedUrl}`
      : `http://${normalizedUrl}`;
  }

  get<ReturnType = Model>(url: string, config?: AxiosRequestConfig) {
    return this.client.get<ReturnType>(url, config);
  }

  post<ReturnType = Model, DataType = ReturnType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig,
  ) {
    return this.client.post<ReturnType>(url, data, config);
  }

  put<ReturnType = Model, DataType = ReturnType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig,
  ) {
    return this.client.put<ReturnType>(url, data, config);
  }

  patch<ReturnType = Model, DataType = ReturnType>(
    url: string,
    data?: Partial<DataType>,
    config?: AxiosRequestConfig,
  ) {
    return this.client.patch<ReturnType>(url, data, config);
  }

  delete<ReturnType = Model>(url: string, config?: AxiosRequestConfig) {
    return this.client.delete<ReturnType>(url, config);
  }
}
