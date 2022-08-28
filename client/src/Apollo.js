import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from "@apollo/client";

const InitializeApolloClient = () => {
  return new ApolloClient({
    uri: "http://localhost:8000/graphql/",
    cache: new InMemoryCache(),
  });
};

const QueryData = () => {
  const GET_DATA = gql`
    query GetData {
      allNodes {
        id
        name
      }
      allEdges {
        id
        sourceId
        targetId
      }
    }
  `;
  return useQuery(GET_DATA);
};

export { ApolloProvider, InitializeApolloClient, QueryData };
