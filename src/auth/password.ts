import argon2 from "argon2";
import { randomBytes } from "node:crypto";

/** Hash a plaintext password using argon2id (the argon2 library default). */
export function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, { type: argon2.argon2id });
}

/** Verify a plaintext password against a stored argon2 hash. */
export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, plain);
}

/** Mint a cryptographically random session token (64 hex chars). */
export function mintToken(): string {
  return randomBytes(32).toString("hex");
}
