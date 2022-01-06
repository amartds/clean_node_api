import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helper/http-helper'
import { Controllers } from '../protocols/controllers'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controllers {
  handle (httpRequest: HttpRequest): HttpResponse {
    const fields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
