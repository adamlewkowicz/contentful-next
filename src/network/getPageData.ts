const query = `
fragment AssetFragment on Asset {
  title
  description
  url
  width
  height
}

fragment SectionHero on SectionHero {
title
subtitle
name
background {
  ...AssetFragment
}
}

fragment SectionTextWithImage on SectionTextWithImage {
name
title
content
variant
image {
  ...AssetFragment
}
}

fragment SectionTextContent on SectionTextContent {
title
content
name
}

query PageData {
page: templatePage(id: "2NKARVWJsFG2YEs4yGyYWX") {
  __typename
  name
  slug
  body: bodyCollection {
    items {
      __typename
      ...SectionHero
      ...SectionTextWithImage
      ...SectionTextContent
    }
  }
  metatags {
    title
    name
    description
    ogImage {
      ...AssetFragment
      contentType
      fileName
      size       
    }
  }
}
header: layoutHeader(id: "1drw8tVTwovdtZTEbcaRQ8") {
  __typename
  name
  menuCollection {
    items {
      name
      title
      url
      type
    }
  }
  logo {
    ...AssetFragment
  }
}
footer: layoutFooter(id: "1J2Z63DOIL4PegsPl8yTK5") {
  __typename
  name
  description
  menuCollection {
    items {
      name
      title
      url
      type
    }
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

export interface Asset {
  title: string;
  description: string;
  contentType: string;
  fileName: string;
  size: number;
  url: string;
  width: number;
  height: number;
}

export interface Metatags {
  title: string;
  name: string;
  description: string;
  ogImage: Asset;
}

export interface ImageData {
  title: string;
  description: string;
  contentType: string;
  fileName: string;
  size: number;
  url: string;
  width: number;
  height: number;
}

export interface MenuItem {
  name: string;
  title: string;
  url: string;
  type: string;
}

export type PageData = {
  page: {
    __typename: string;
    name: string;
    slug: string;
    body: {
      items: {
        name?: string;
        title: string;
        subtitle?: string;
        __typename: string;
        image?: ImageData;
      }[];
    };
    metatags: Metatags;
  };
  header: {
    __typename: string;
    name: string;
    menuCollection: {
      items: MenuItem[];
    };
    logo: Asset;
  };
  footer: {
    __typename: string;
    name: string;
    description: string;
    menuCollection: {
      items: MenuItem[];
    };
  };
};

type GetPageDataResponse = {
  data: PageData;
};
