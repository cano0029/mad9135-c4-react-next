// /** @jsxImportSource theme-ui */

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
// import { ThemeProvider } from 'theme-ui';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  //pageProps is props

  //TODO: fetch data on initial load

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    let url = '/api/podcasts/';
    fetch(url, { method: 'GET' })
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        setPodcasts(data.podcasts);
      })
      .catch(console.error);
  }, []);

  // LAYOUT FOR EVERY SINGLE PAGE IN THE WEBSITE:
  return (
    // <ThemeProvider theme={theme}>
    <Layout>
      <Component podcasts={podcasts} {...pageProps} />
    </Layout>
    // </ThemeProvider>
  ); //Component is index.js (home)
}

export default MyApp;
