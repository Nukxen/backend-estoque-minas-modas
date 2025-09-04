import { argon2id } from "argon2";

export const PEPPER = process.env.PASSWORD_PEPPER ?? '';

export const ARGON_OPTS = {
  type: argon2id,
  timeCost: 3,
  memoryCost: 1 << 16, // 64 MiB
  parallelism: 1,
} as const;
