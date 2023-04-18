import * as contentfulComponents from '@/components/contentful';

interface ComponentConnectorProps {
  __typename: string;
}

const NotFound = (props: ComponentConnectorProps) => {
  return <p>Not found component: {props.__typename}</p>;
};

export function ComponentConnector(props: ComponentConnectorProps) {
  // It's safe to use any here since imported modules
  // are technically an object under the hood
  const SelectedComponent = (contentfulComponents as any)[props.__typename];
  const GenericComponent = SelectedComponent ?? NotFound;

  return <GenericComponent {...props} />;
}
