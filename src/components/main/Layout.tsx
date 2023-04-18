import { type Metatags, type PageData } from '@/network/getPageData';
import Head from 'next/head';
import React, { type ReactNode } from 'react';
import { OgImageMeta } from './OgImage';
import { Header } from './Header';
import { Footer } from './Footer';
import { DM_Sans as Font } from 'next/font/google';

const font = Font({ subsets: ['latin'], weight: ['400', '500', '700'] });

interface LayoutProps {
  metatags: Metatags;
  children: ReactNode;
  header: PageData['header'];
  footer: PageData['footer'];
}

export function Layout({ metatags, children, header, footer }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{metatags.title}</title>
        <meta name="description" content={metatags.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <OgImageMeta ogImage={metatags.ogImage} />
      </Head>
      <div style={font.style}>
        <Header data={header} />
        <main>{children}</main>
        <Footer data={footer} />
      </div>
    </>
  );
}
