import * as contentfulComponents from '@/components/contentful';

export function componentSelector() {}

interface ComponentConnectorProps {
  __typename: string;
}

const NotFound = (props: ComponentConnectorProps) => {
  return <p>Not found component: {props.__typename}</p>;
};

export function ComponentConnector(props: ComponentConnectorProps) {
  const SelectedComponent =
    (contentfulComponents as any)[props.__typename] ?? NotFound;

  return <SelectedComponent {...props} />;
}
