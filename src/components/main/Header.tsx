import React from 'react';
import styled from '@emotion/styled';
import type { PageData } from '@/network/getPageData';
import { MenuLinks } from './MenuLinks';

interface HeaderProps {
  data: PageData['header'];
}

export function Header({ data }: HeaderProps) {
  return (
    <Container>
      <img
        src={data.logo.url}
        alt={data.logo.title}
        width="auto"
        height="100"
      />
      <MenuLinks items={data.menuCollection.items} />
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  width: 100%;
`;
