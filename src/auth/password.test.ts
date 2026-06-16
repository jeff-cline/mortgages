import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, mintToken } from "./password";

describe("password hashing", () => {
  it("verifies a correct password against its hash", async () => {
    const hash = await hashPassword("CorrectHorse!23");
    expect(await verifyPassword("CorrectHorse!23", hash)).toBe(true);
  });

  it("rejects an incorrect password", async () => {
    const hash = await hashPassword("CorrectHorse!23");
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });

  it("produces argon2id hashes that differ per call (salted)", async () => {
    const a = await hashPassword("same");
    const b = await hashPassword("same");
    expect(a).not.toBe(b);
  });
});

describe("mintToken", () => {
  it("returns distinct tokens of length >= 32", () => {
    const t1 = mintToken();
    const t2 = mintToken();
    expect(t1).not.toBe(t2);
    expect(t1.length).toBeGreaterThanOrEqual(32);
    expect(t2.length).toBeGreaterThanOrEqual(32);
  });
});
