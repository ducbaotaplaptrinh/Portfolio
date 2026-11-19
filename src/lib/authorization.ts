export function isAllowedEmail(email: string | null | undefined, allowlist: string | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return normalized !== "" && (allowlist ?? "").split(",").some(value => value.trim().toLowerCase() === normalized);
}
export function canSignIn(email: string | null | undefined, verified: unknown, allowlist: string | undefined): boolean {
  return verified === true && isAllowedEmail(email, allowlist);
}
