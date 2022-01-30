import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return valid if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('any_valid_email@email.com')
    expect(isValid).toBe(true)
  })

  test('should return a same email to validator', () => {
    const sut = makeSut()
    const isValidEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_valid_email@mail.com')
    expect(isValidEmailSpy).toBeCalledWith('any_valid_email@mail.com')
  })
})
