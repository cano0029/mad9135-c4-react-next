import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AppContext } from '../Contexts/AppContext';
import '../styles/globals.css';
import { AppProvider } from '../Contexts/AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
