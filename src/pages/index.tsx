import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ComponentConnector } from '@/utils/componentSelector';
import { GetServerSideProps } from 'next';

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  data: any
}

export default function Home({ data }: HomeProps) {
  const { page } = data;
  const { metatags } = page;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {page.body.items.map((comp: any) => (
          <ComponentConnector key={comp.__typename} {...comp}  />
        ))}
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  async function fetchGraphQL(query: any) {
    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    ).then((response) => response.json());
  }
  
  const response = await fetchGraphQL(`
  query PageData {
    page: templatePage(id: "2NKARVWJsFG2YEs4yGyYWX") {
      __typename
      name
      slug
      body: bodyCollection {
        items {
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
  }
  `);

  console.log(response.data);

  return {
    props: {
      data: response.data
    }
  }
}


