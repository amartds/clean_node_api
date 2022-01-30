import { EmailValidatorAdapter } from './email-validator'

describe('Email Validator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
