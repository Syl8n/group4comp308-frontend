import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage';
import PatientMenu from './components/Patient/PatientMenu';
import NurseMenu from './components/Nurse/NurseMenu';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthPage />} />
          <Route exact path="/patient/:id" element={<PatientMenu />} />
          <Route exact path="/nurse/:id" element={<NurseMenu />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );

}

export default App;



