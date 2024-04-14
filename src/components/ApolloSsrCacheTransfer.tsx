'use server';

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { FC } from 'react';

type Props = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export const ApolloSsrCacheTransfer: FC<Props> = (props) => {
  const { apolloClient } = props;
  const apolloCache = apolloClient.extract();

  return (
    <script
      // eslint-disable-next-line react/no-danger -- send apollo cache from the server to the client
      dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${JSON.stringify(apolloCache).replace(/</g, '\\u003c')};`,
      }}
    />
  );
};
