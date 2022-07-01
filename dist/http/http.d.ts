import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpClientConstructor } from 'types/httpClient';
export declare abstract class HttpClient<Model> {
    private isBaseEndpointSecure;
    protected client: AxiosInstance;
    constructor({ isBaseEndpointSecure, baseUrl, endpoint }: HttpClientConstructor, config: Omit<AxiosRequestConfig<Model>, 'baseURL'>);
    normalizeUrl(url: string): string;
    get<ReturnType = Model>(url: string, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ReturnType, any>>;
    post<ReturnType = Model, DataType = ReturnType>(url: string, data?: DataType, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ReturnType, any>>;
    put<ReturnType = Model, DataType = ReturnType>(url: string, data?: DataType, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ReturnType, any>>;
    patch<ReturnType = Model, DataType = ReturnType>(url: string, data?: Partial<DataType>, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ReturnType, any>>;
    delete<ReturnType = Model>(url: string, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ReturnType, any>>;
}
