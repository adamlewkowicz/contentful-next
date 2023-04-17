import type { Asset } from '@/network/getPageData';
import React from 'react';

interface OgImageMetaProps {
  ogImage: Asset;
}

export function OgImageMeta({ ogImage }: OgImageMetaProps) {
  return (
    <>
      <meta property="og:title" content={ogImage.title} />
      <meta property="og:image" content={ogImage.url} />
      <meta
        property="og:image:secure_url"
        content="https://secure.example.com/ogp.jpg"
      />
      <meta property="og:image:type" content={ogImage.contentType} />
      <meta property="og:image:width" content={`${ogImage.width}`} />
      <meta property="og:image:height" content={`${ogImage.height}`} />
      <meta property="og:image:alt" content={ogImage.description} />
    </>
  );
}
