export function normalizeSlug(slug: string | string[]): string {
  let normalizedSlug = '';

  if (Array.isArray(slug)) {
    normalizedSlug = slug.join('/');
  } else {
    normalizedSlug = slug;
  }

  if (!normalizedSlug.startsWith('/')) {
    normalizedSlug = `/${normalizedSlug}`;
  }
  return normalizedSlug;
}
