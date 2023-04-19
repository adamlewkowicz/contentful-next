import React from 'react';
import styled from '@emotion/styled';
import type { Asset } from '@/network/getPageData';

export interface SectionHeroProps {
  title: string;
  subtitle: string;
  background: Asset;
}

export function SectionHero({ title, subtitle, background }: SectionHeroProps) {
  return (
    <Container>
      <Content>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </Content>
      <Img
        loading="lazy"
        src={background.url}
        alt={background.title}
        width={background.width}
        height={background.height}
      />
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  height: 100vh;
`;

const Content = styled.div`
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 2rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
