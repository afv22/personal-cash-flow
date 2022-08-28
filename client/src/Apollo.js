import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const InitializeApolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:8000/graphql/",
    cache: new InMemoryCache(),
  });
};

export { ApolloProvider, InitializeApolloClient };
