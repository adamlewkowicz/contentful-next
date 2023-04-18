import type { PageData } from '@/network/getPageData';
import React from 'react';
import { MenuLinks } from './MenuLinks';
import styled from '@emotion/styled';

interface FooterProps {
  data: PageData['footer'];
}

export function Footer({ data }: FooterProps) {
  return (
    <Container>
      <p>{data.description}</p>
      <MenuLinks items={data.menuCollection.items} />
    </Container>
  );
}

const Container = styled.footer`
  padding: 64px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 84px;
  background: rgba(1, 1, 1, 0.8);
  color: #fff;
`;
