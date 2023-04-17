import { type Metatags } from '@/network/getPageData';
import Head from 'next/head';
import React, { type ReactNode } from 'react';
import { OgImageMeta } from './OgImage';

interface LayoutProps {
  metatags: Metatags;
  children: ReactNode;
}

export function Layout({ metatags, children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{metatags.title}</title>
        <meta name="description" content={metatags.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <OgImageMeta ogImage={metatags.ogImage} />
      </Head>
      <main>{children}</main>
    </div>
  );
}
