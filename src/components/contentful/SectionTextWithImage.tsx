import type { ImageData } from '@/network/getPageData';
import styled from '@emotion/styled';
import React from 'react';
import ReactMarkdown from 'react-markdown';

type Variant = 'left' | 'right';

export interface SectionTextWithImageProps {
  title: string;
  image: ImageData;
  content: string;
  variant: Variant;
}

export function SectionTextWithImage({
  title,
  image,
  content,
  variant,
}: SectionTextWithImageProps) {
  return (
    <Container variant={variant}>
      <TextContainer>
        <Title>{title}</Title>
        <div>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </TextContainer>
      <Img
        loading="lazy"
        src={image.url}
        alt={image.title}
        width={image.width}
        height={image.height}
      />
    </Container>
  );
}

const Container = styled.section<{ variant: Variant }>`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: ${(props) =>
    props.variant === 'right' ? 'row' : 'row-reverse'};
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 24px;
`;

const Title = styled.h2`
  margin-bottom: 8px;
`;

const Img = styled.img`
  flex: 1;
  max-width: 100%;
  max-width: 50vw;
  max-height: 50vw;
  position: relative;
`;
