/** Does not expose the URL or validate connectivity. */
export function hasDatabaseUrl(value: string | undefined): boolean {
  return Boolean(value?.trim());
}
