import { ComponentConnector } from '@/utils/componentSelector';
import { type GetServerSideProps } from 'next';
import { getPageData } from '@/network/getPageData';
import { type PageData } from '@/network/getPageData';
import { Layout } from '@/components/main';

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const data = await getPageData();

  return {
    props: {
      data,
    },
  };
};
