import { ComponentConnector } from '@/components/utils';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { getPageDataBySlug } from '@/network/getPageData';
import { type PageData } from '@/network/getPageData';
import { Layout } from '@/components/main';
import { normalizeSlug } from '@/utils';
import { getPages } from '@/network/getPages';

interface HomeProps {
  data: PageData;
}

export default function Home({ data }: HomeProps) {
  const { page, header, footer } = data;
  const { metatags } = page;

  return (
    <Layout metatags={metatags} header={header} footer={footer}>
      {page.body.items.map((item) => (
        <ComponentConnector key={item.name ?? item.__typename} {...item} />
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async (ctx) => {
  const { slug = [] } = ctx.params ?? {};
  const normalizedSlug = normalizeSlug(slug);
  const data = await getPageDataBySlug(normalizedSlug);

  if (data == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages();
  const paths = pages.map((page) => page.slug);

  return {
    paths,
    fallback: 'blocking',
  };
};
