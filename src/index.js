import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import ApolloProvider from 'react-apollo';

const client = new ApolloClient();

ReactDOM.render(
    <ApolloProvider client={client}>
        <h1>Hello World</h1>
    </ApolloProvider>,
    document.getElementById('root')
);
