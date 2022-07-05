export interface HttpClientConstructor {
  useHttps?: boolean;
  baseUrl: string;
  endpoint?: string;
}

export type HttpClientAxiosConfig<Model> = Omit<
  import('axios').AxiosRequestConfig<Model>,
  'baseURL'
>;
