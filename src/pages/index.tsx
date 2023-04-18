import Head from 'next/head';
import { Inter } from 'next/font/google';
import { DM_Sans as Font } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { ComponentConnector } from '@/utils/componentSelector';
import { type GetServerSideProps } from 'next';
import { getPageData } from '@/network/getPageData';
import { type PageData } from '@/network/getPageData';
import { Layout } from '@/components/main';

const font = Font({ subsets: ['latin'], weight: ['400', '500', '700'] });

interface HomeProps {
  data: PageData;
}

export default function Home({ data }: HomeProps) {
  const { page } = data;
  const { metatags } = page;

  return (
    <div style={font.style}>
      <Layout metatags={metatags}>
        {page.body.items.map((comp: any) => (
          <ComponentConnector key={comp.name ?? comp.__typename} {...comp} />
        ))}
      </Layout>
    </div>
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
