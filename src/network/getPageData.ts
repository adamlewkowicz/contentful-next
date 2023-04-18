import { fetchGraphQl } from '@/utils';
import { getPages } from './getPages';

const MAIN_HEADER_ID = '1drw8tVTwovdtZTEbcaRQ8';
const MAIN_FOOTER_ID = '1J2Z63DOIL4PegsPl8yTK5';

const getPageQuery = (pageId: string) => `
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
  page: templatePage(id: "${pageId}") {
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
  header: layoutHeader(id: "${MAIN_HEADER_ID}") {
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
  footer: layoutFooter(id: "${MAIN_FOOTER_ID}") {
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
}
`;

async function getPageDataById(pageId: string): Promise<PageData> {
  const response = await fetchGraphQl<GetPageDataResponse>(
    getPageQuery(pageId),
  );
  return response.data;
}

export async function getPageDataBySlug(
  slug: string,
): Promise<PageData | null> {
  const allPages = await getPages();
  const requestedPage = allPages.find((page) => page.slug === slug);

  if (requestedPage) {
    const pageData = await getPageDataById(requestedPage.id);
    return pageData;
  }

  return null;
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
