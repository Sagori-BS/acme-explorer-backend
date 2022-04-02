import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export class HttpServiceMock {
  private readonly instance;
  mockResponse: AxiosResponse;

  setMockedResponse(mockResponse: AxiosResponse) {
    this.mockResponse = mockResponse;
  }

  request<T = any>(_config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
    return new Observable(suscriber => {
      suscriber.next(this.mockResponse);
    });
  }

  get<T = any>(
    _url: string,
    _config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return new Observable(suscriber => {
      suscriber.next(this.mockResponse);
    });
  }

  delete<T = any>(
    _url: string,
    _config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return new Observable(suscriber => {
      suscriber.next(this.mockResponse);
    });
  }

  head<T = any>(
    _url: string,
    _config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return new Observable(suscriber => {
      suscriber.next(this.mockResponse);
    });
  }

  post<T = any>(
    _url: string,
    _data?: any,
    _config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return new Observable(suscriber => {
      suscriber.next(this.mockResponse);
    });
  }

  put<T = any>(
    _url: string,
    _data?: any,
    _config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return new Observable(suscriber => {
      suscriber.next(this.mockResponse);
    });
  }

  patch<T = any>(
    _url: string,
    _data?: any,
    _config?: AxiosRequestConfig
  ): Observable<AxiosResponse<T>> {
    return new Observable(suscriber => {
      suscriber.next(this.mockResponse);
    });
  }

  axiosRef(): AxiosInstance {
    return this.instance;
  }
}
