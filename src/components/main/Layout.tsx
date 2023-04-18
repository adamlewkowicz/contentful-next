import { type Metatags, type PageData } from '@/network/getPageData';
import Head from 'next/head';
import React, { type ReactNode } from 'react';
import { OgImageMeta } from './OgImage';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  metatags: Metatags;
  children: ReactNode;
  header: PageData['header'];
  footer: PageData['footer'];
}

export function Layout({ metatags, children, header, footer }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{metatags.title}</title>
        <meta name="description" content={metatags.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <OgImageMeta ogImage={metatags.ogImage} />
      </Head>
      <Header data={header} />
      <main>{children}</main>
      <Footer data={footer} />
    </div>
  );
}
