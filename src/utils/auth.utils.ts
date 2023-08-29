import * as bcrypt from 'bcrypt';

export const hashData = async (
  data: string,
  roundAmount: number,
): Promise<string> => await bcrypt.hash(data, roundAmount);
export const compareHashes = async (
  data: string,
  hash: string,
): Promise<boolean> => await bcrypt.compare(data, hash);
