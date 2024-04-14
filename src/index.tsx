import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { FC, PropsWithChildren } from 'react';

import { ApolloSsrCacheTransfer, ApolloSsrProvider } from './components';
import { config } from './config';

const { isServer } = config;

export const createApolloSsrClient = (
  options: ApolloClientOptions<NormalizedCacheObject>,
) => {
  const apolloClient = new ApolloClient({
    ...options,
    cache: isServer
      ? new InMemoryCache()
      : new InMemoryCache().restore(window.__APOLLO_STATE__),
  });

  const ApolloProvider: FC<PropsWithChildren> = (props) => {
    const { children } = props;

    return (
      <ApolloSsrProvider apolloClient={apolloClient}>
        {children}
      </ApolloSsrProvider>
    );
  };

  const ApolloCacheTransfer: FC = () => {
    return <ApolloSsrCacheTransfer apolloClient={apolloClient} />;
  };

  return {
    apolloClient,
    ApolloProvider,
    ApolloCacheTransfer,
  };
};

export * from './components';
