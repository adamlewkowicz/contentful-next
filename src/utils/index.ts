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

export async function fetchGraphQl<T>(query: string): Promise<T> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json());
}
