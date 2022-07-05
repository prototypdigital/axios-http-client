# Axios HTTP wrapper

Axios HTTP wrapper is a simple class wrapper around axios written in typescript that's made to generalize API calls for the whole project, to make API calls easier, and to make your code cleaner.

You can use this wrapper as you want but our advice is to create one file (or if you're using React, create a hook) where you will instantiate one generalized `HttpClient` class and configure your axios client as you want. And then reuse it in your services.
`HttpClient` class is written as an abstract class, and if you want to use it, you have to extend it. You have to pass some props to instantiate this class.

## Installation

To install and use this package run

```
yarn add ssh:git@github.com:prototypdigital/axios-http-wrapper.git#main
yarn add https://github.com/prototypdigital/axios-http-wrapper.git#main
```

## Props

`HttpClient`'s super constructor need to take two parameters. `httpClientConstructor` and axios `config`.

#### `httpClientConstructor`

This object consists of three properties:

-   `useHttps?: boolean` - which is false by default. It's used by `normalizeUrl` function that's taking care of removing any duplicated slashes if you have any. And it will prepend an `http://` or `https://` to your `baseUrl`. If `useHttps = true`, `normalizeUrl` will prepend `https://` to your `baseURL` and if it's `false` it will prepend `http://`
-   `baseUrl: string` - it's the base part of your API URL. It's generally an `http://0.0.0.0:PORT` or `http://localhost:PORT` if you're developing on a local environment or any other base URL if your API is published somewhere.
-   `endpoint?: string` - as the name says it's an endpoint, when you pass it the final product will look something like this: `baseUrl/endpoint`. If `endpoint` is changing a lot it shouldn't be passed as a prop to the instantiated http client class

`baseUrl` and `endpoint` are properties that you're passing just to instantiate your base http class.

#### `config`

It's just an `AxiosRequestConfig` object that doesn't have `baseURL` as a prop. You can check about this config more [on the official documentation](https://axios-http.com/docs/req_config).

## Usage

When you instantiate this class. You get access to `get`, `post`, `put`, `patch` and `delete` request. Every request is typed and every request has some props you need to pass, such as `url` and some props that are optional as `data` and `config`.

Here are definitions of all requests you can do:

```
// Model is a generic that's passed to a HttpClient class when you instanciate it.
get<ReturnType = Model>(url: string, config?: AxiosRequestConfig)

post<ReturnType = Model, DataType = ReturnType>(
  url: string,
  data?: DataType,
  config?: AxiosRequestConfig,
)

put<ReturnType = Model, DataType = ReturnType>(
  url: string,
  data?: DataType,
  config?: AxiosRequestConfig,
)

patch<ReturnType = Model, DataType = ReturnType>(
  url: string,
  data?: Partial<DataType>,
  config?: AxiosRequestConfig,
)

delete<ReturnType = Model>(url: string, config?: AxiosRequestConfig)
```

### React example

If you're using React you can simplify the usage of this wrapper by creating some `useHttpClient` hook that can be reused for the whole project. For example:

```
// useHttpClient.ts
import { useMemo } from 'react';
import { HttpClient, HttpClientConstructor, HttpClientAxiosConfig } from 'axios-http-wrapper';

export function useHttpClient<T>(endpoint?: string) {
  // Use types for autocompletion.
  const httpClientConstructor: HttpClientConstructor = {
    useHttps: false, // it's false by default, but you can define it
    baseUrl: 'http://some.api.url',
    endpoint,
  }

  const config: HttpClientAxiosConfig<BaseModel> = {
    headers: {
      accept: 'application/json',
    };
  }

  class ClientService extends HttpClient<T> {
    constructor() {
      super(httpClientConstructor, config);

      // If you need to configure some axios interceptors, you can also do this here.
      this.client.interceptors.response.use(
        (response) => response,
        (error) => error,
      );
    }
  }

  return useMemo(() => new ClientService(), []);
}

```

And when you want to create some API calls, just call this hook and use instanciated service.

```
// useMakingApiCalls.ts

export function useMakingApiCalls() {
  const someService = useHttpClient<SomeModel>('/general-endpoint-for-this-service');

  // delete call is the same as get
  async function getApiCall() {
    try {
      const result = await someService.get<SomeModel>('/endpoint');
      // do something with the result
    } catch(e) {
      // do something with this error
    }
  }

  async function getApiCallWithParams(params: ParamType) {
    try {
      const result = await someService.get('/endpoint', { params });
      // do something with the result
    } catch(e) {
      // do something with this error
    }
  }

  // put and patch are the same as post call
  async function postApiCall(someData: DataType) {
    try {
      const result = await someService.post('/endpoint', someData);
      // do something with the result
    } catch(e) {
      // do something with this error
    }
  }

}
```

### More general example

To use this you can create an `http.ts` file and inside define your http client class that's extending our, defined `HttpClient` class. For example:

```
// http.ts
import { HttpClient, HttpClientConstructor, HttpClientAxiosConfig } from 'axios-http-wrapper';

// Type it for autocomplete.
const httpClientConstructor: HttpClientConstructor = {
  useHttps: false, // it's false by default, but you can define it
  baseUrl: 'http://some.api.url',
}

const config: HttpClientAxiosConfig<BaseModel> = {
  headers: {
    accept: 'application/json',
  };
}

// HttpClient class can have some BaseModel passed as a generic.
export const MyHttpClient extends HttpClient<BaseModel> {
  constructor(private endpoint?: string) {
    super({
      useHttps: false, // it's false by default, but you can define it
      baseUrl: 'http://some.api.url',
      endpoint: this.endpoint,
    }, config);

    // If you need to configure some axios interceptors, you can also do this here.
    this.client.interceptors.response.use(
      (response) => response,
      (error) => error,
    );
  }
}
```

And then you can use this as

```
const someApiCalls = new MyHttpClient('/some-endpoint');

// delete call is the same as get
async function getApiCall() {
  try {
    const result = await someService.get<SomeModel>('/endpoint');
    // do something with the result
  } catch(e) {
    // do something with this error
  }
}

async function getApiCallWithParams(params: ParamType) {
  try {
    const result = await someService.get('/endpoint', { params });
    // do something with the result
  } catch(e) {
    // do something with this error
  }
}

// put and patch are the same as post call
async function postApiCall(someData: DataType) {
  try {
    const result = await someService.post('/endpoint', someData);
    // do something with the result
  } catch(e) {
    // do something with this error
  }
}
```

---

Special thanks to [@vlaja](https://github.com/vlaja) for initiating the creation of this wrapper and special thanks to [@mrkaza](https://github.com/mrkaza) for simplifying the usage of this wrapper.
