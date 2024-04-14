# next-ssr-apollo-connector

This package conveniently integrates Next.js, Apollo Client, and server-side rendering.

## Installation

```bash
npm install next-ssr-apollo-connector
# or
yarn add next-ssr-apollo-connector
```

## Usage

> The library automatically manages caching, but for seamless server-side rendering, you'll need to configure links, including WebSocket links, and batchHttpLink manually.

### Setting up Apollo Client

To configure Apollo Client for server-side rendering, first create an Apollo SSR client using `createApolloSsrClient` from `next-ssr-apollo-connector`. This function returns essential components needed for SSR with Apollo Client.

```ts
// apollo.ts
import { createApolloSsrClient } from 'next-ssr-apollo-connector';

export const { ApolloProvider, ApolloCacheTransfer, apolloClient } =
  createApolloSsrClient({
    // your Apollo Client configuration
  });
```

### Integrating with Layout Component

In your layout component (app/layout.tsx), ensure that the ApolloProvider wraps around your application's content. Additionally, include ApolloCacheTransfer in the head section to transfer the Apollo cache from server to client.

```ts
// app/layout.tsx
import { ApolloProvider, ApolloCacheTransfer } from "./apollo"

const Layout: FC<PropsWithChildren> = (props) => {
    const { children } = props;

    return (
      <html lang="en">
        <head>
          <ApolloCacheTransfer />
        </head>
        <body>
          <ApolloProvider>{children}</ApolloProvider>
        </body>
      </html>
    );
  };

export default Layout;
```

### Using Apollo Client in Server Components

In server-side components, you can access the initialized apolloClient to execute queries or mutations.

```ts
// any server component
"use server"
import { apolloClient } from "./apollo"

const ServerComponent: FC = async () => {
    const data = apolloClient.query({
      // your query config
    })

    console.log(data)

    return (
      <>Server component</>
    );
  };
```
