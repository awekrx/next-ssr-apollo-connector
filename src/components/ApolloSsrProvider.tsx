'use client';

import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  apolloClient: ApolloClient<NormalizedCacheObject>;
}>;

export const ApolloSsrProvider: FC<Props> = (props) => {
  const { apolloClient, children } = props;

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
