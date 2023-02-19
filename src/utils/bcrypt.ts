import * as bcrypt from 'bcryptjs';

/** (payload) => string */
export const hashBcrypt = async (payload: string): Promise<string> => {
  const result = await bcrypt.hash(payload, 10);
  return result;
};

/** (payload, hash) => boolean */
export const compareBcrypt = async (
  payload: string,
  hash: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(payload, hash);
  return result;
};
