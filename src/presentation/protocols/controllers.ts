import { HttpRequest, HttpResponse } from './http';

export interface Controllers {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
