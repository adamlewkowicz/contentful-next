import {
  SectionHero,
  SectionTextContent,
  SectionTextWithImage,
  type SectionHeroProps,
  type SectionTextContentProps,
  type SectionTextWithImageProps,
} from '@/components/contentful';

type PropsWithType<Typename, Props = {}> = { __typename: Typename } & Props;

type AllComponentProps =
  | PropsWithType<'SectionHero', SectionHeroProps>
  | PropsWithType<'SectionTextContent', SectionTextContentProps>
  | PropsWithType<'SectionTextWithImage', SectionTextWithImageProps>
  | PropsWithType<'NotFound'>;

export function ComponentConnector(props: AllComponentProps): JSX.Element {
  switch (props.__typename) {
    case 'SectionHero':
      return <SectionHero {...props} />;
    case 'SectionTextContent':
      return <SectionTextContent {...props} />;
    case 'SectionTextWithImage':
      return <SectionTextWithImage {...props} />;
    default:
      return <NotFound __typename={props.__typename} />;
  }
}

const NotFound = (props: { __typename: string }) => {
  return <p>Not found component: {props.__typename}</p>;
};
