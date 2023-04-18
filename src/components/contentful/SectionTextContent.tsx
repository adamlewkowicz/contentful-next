import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import styled from '@emotion/styled';

interface SectionTextContentProps {
  title: string;
  content: string;
}

export function SectionTextContent({
  title,
  content,
}: SectionTextContentProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <ReactMarkdown>{content}</ReactMarkdown>
    </Container>
  );
}

const Container = styled.section`
  padding: 64px;
  margin: 64px 0;
`;

const Title = styled.h2`
  margin-bottom: 24px;
`;
