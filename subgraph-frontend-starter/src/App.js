import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import './App.css';

function App() {
  const [transfers, setTransfers] = useState([]);

  const QueryURL =
    "https://api.studio.thegraph.com/query/72153/uniswap-test/version/latest";

  // eslint-disable-next-line
  const client = new ApolloClient({
    uri: QueryURL,
    cache: new InMemoryCache(),
  });

  const GET_TRANSFERS = gql`
    query {
      transfers(first: 5) {
        id
        sender
        receiver
        amount
      }
    }
  `;

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const { data } = await client.query({ query: GET_TRANSFERS });
        setTransfers(data.transfers);
      } catch (error) {
        console.error("Error fetching transfers: ", error);
      }
    };

    fetchTransfers();
    return () => {};
  }, [client, GET_TRANSFERS]);

  return (
    <>
      <div>
        <h1>Transfer Token Results</h1>
        {transfers !== null &&
          transfers.length > 0 &&
          transfers.map((transfer) => (
            <div key={transfer.id}>
              <div>Sender:{transfer.sender}</div>
              <div>Receiver:{transfer.receiver}</div>
              <div>Amount:{transfer.amount}</div>
              <br />
            </div>
          ))}
      </div>
    </>
  );
}

export default App;