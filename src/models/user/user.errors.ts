import { ApplicationError } from 'src/utils/error';

export const VerifyCodeIsNotCorrect = new ApplicationError({
  message: 'Verify code is not correct.',
});

export const InvalidPassword = new ApplicationError({
  message: 'Invalid Password',
});
