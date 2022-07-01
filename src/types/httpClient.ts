export interface HttpClientConstructor {
  isBaseEndpointSecure?: boolean;
  baseUrl: string;
  endpoint?: string;
}
