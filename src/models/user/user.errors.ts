import { ApplicationError } from 'src/utils/error';

export const VerifyCodeIsNotCorrect = new ApplicationError({
  message: 'Verify code is not correct.',
});
