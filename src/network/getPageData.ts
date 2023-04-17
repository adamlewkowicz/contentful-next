const query = `
fragment SectionHeroFragment on SectionHero {
  title
  subtitle
  
}

query PageData {
page: templatePage(id: "2NKARVWJsFG2YEs4yGyYWX") {
  __typename
  name
  slug
  body: bodyCollection {
    items {
      ...SectionHeroFragment
      ...on SectionTextWithImage {
        title
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
      ...on SectionTextContent {
        title
        content
      }
      __typename
    }
  }
  metatags {
    title
    name
    description
    ogImage {
      title
      description
      contentType
      fileName
      size
      url
      width
      height
    }
  }
}

layoutHeaderCollection {
  items {
    sys {
      id
    }
    name
    menuCollection {
      items {
        name
        title
        url
      }
    }
    __typename
  }
}
}`;

async function fetchGraphQL<T>(query: any): Promise<T> {
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

export async function getPageData(): Promise<PageData> {
  const response = await fetchGraphQL<GetPageDataResponse>(query);
  return response.data;
}

export type OgImage = {
  title: string;
  description: string;
  contentType: string;
  fileName: string;
  size: number;
  url: string;
  width: number;
  height: number;
};

export interface Metatags {
  title: string;
  name: string;
  description: string;
  ogImage: OgImage;
}

export type PageData = {
  page: {
    __typename: string;
    name: string;
    slug: string;
    body: {
      items: Array<{
        title: string;
        subtitle?: string;
        __typename: string;
        image?: {
          title: string;
          description: string;
          contentType: string;
          fileName: string;
          size: number;
          url: string;
          width: number;
          height: number;
        };
      }>;
    };
    metatags: Metatags;
  };
  layoutHeaderCollection: {
    items: Array<{
      sys: {
        id: string;
      };
      name: string;
      menuCollection: {
        items: Array<{
          name: string;
          title: string;
          url: string;
        }>;
      };
      __typename: string;
    }>;
  };
};

type GetPageDataResponse = {
  data: PageData;
};
