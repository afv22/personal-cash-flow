import { ApolloClient, InMemoryCache } from "@apollo/client";

export default () => {
  return new ApolloClient({
    uri: "http://localhost:8000/graphql/",
    cache: new InMemoryCache(),
  });
};
