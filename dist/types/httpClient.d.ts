export interface HttpClientConstructor {
    isBaseEndpointSecure?: boolean;
    baseUrl: string;
    endpoint?: string;
}
export declare type HttpClientAxiosConfig<Model> = Omit<import('axios').AxiosRequestConfig<Model>, 'baseURL'>;
