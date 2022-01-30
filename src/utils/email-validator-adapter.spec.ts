import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('any_invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return valid if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_valid_email@email.com')
    expect(isValid).toBe(true)
  })
})
