"use server"
import CryptoJS from 'crypto-js'; 

export async function getHash(input: string): Promise<string> {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('SECRET_KEY is not defined');
  }
  return CryptoJS.HmacSHA256(input, secretKey).toString(CryptoJS.enc.Hex);
}
