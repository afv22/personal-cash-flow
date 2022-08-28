import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const InitializeApolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:8000/graphql/",
    cache: new InMemoryCache(),
  });
};

export { ApolloProvider, InitializeApolloClient };
