import { fetchGraphQl } from './getPageData';

const getPagesQuery = `
query TemplatePageCollection {
  templatePageCollection {
    items {
      name
			slug
      sys {
        id
      }
    }
  }
}
`;

export async function getPages(): Promise<PageInfo[]> {
  const response = await fetchGraphQl<GetPagesResponse>(getPagesQuery);
  const normalizedPages = response.data.templatePageCollection.items.map(
    (item) => ({
      id: item.sys.id,
      name: item.name,
      slug: item.slug,
    }),
  );
  return normalizedPages;
}

interface PageInfo {
  id: string;
  name: string;
  slug: string;
}

interface GetPagesResponse {
  data: {
    templatePageCollection: {
      items: {
        name: string;
        slug: string;
        sys: {
          id: string;
        };
      }[];
    };
  };
}
