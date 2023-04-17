import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { ComponentConnector } from '@/utils/componentSelector';
import { type GetServerSideProps } from 'next';
import { getPageData } from '@/network/getPageData';
import type { PageData } from '@/network/getPageData';
import { Layout } from '@/components/main';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  data: PageData;
}

export default function Home({ data }: HomeProps) {
  const { page } = data;
  const { metatags } = page;

  return (
    <Layout metatags={metatags}>
      {page.body.items.map((comp: any) => (
        <ComponentConnector key={comp.__typename} {...comp} />
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
