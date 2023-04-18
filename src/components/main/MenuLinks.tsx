import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import type { MenuItem } from '@/network/getPageData';

interface MenuLinksProps {
  items: MenuItem[];
}

export function MenuLinks({ items }: MenuLinksProps) {
  return (
    <Links>
      {items.map((item) => (
        <LinkContainer key={item.name}>
          {item.type === 'internal' ? (
            <Link href={item.url}>{item.title}</Link>
          ) : (
            <a href={item.url}>{item.title}</a>
          )}
        </LinkContainer>
      ))}
    </Links>
  );
}

const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 48px;
  align-items: center;
  margin-right: 80px;
`;

const LinkContainer = styled.li``;
