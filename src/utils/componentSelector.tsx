import * as components from '@/components';

export function componentSelector() {}

interface ComponentConnectorProps {
  __typename: string;
}

const NotFound = (props: ComponentConnectorProps) => {
  return <p>Not found component: {props.__typename}</p>;
};

export function ComponentConnector(props: ComponentConnectorProps) {
  // const componentsMap = Object.fromEntries(Object.entries(components))
  const SelectedComponent = (components as any)[props.__typename] ?? NotFound;

  return <SelectedComponent {...props} />;
}
