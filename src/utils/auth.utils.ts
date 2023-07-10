import * as bcrypt from 'bcrypt';

export const hashData = async (data: string, roundAmount) =>
  await bcrypt.hash(data, roundAmount);
export const compareHashes = async (data: string, hash: string) =>
  await bcrypt.compare(data, hash);
