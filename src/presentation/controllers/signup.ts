import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helper/http-helper'
import { HttpRequest, HttpResponse, EmailValidator, Controllers } from '../protocols'

export class SignUpController implements Controllers {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const fields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
