import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AppContext } from '../Contexts/AppContext';
import '../styles/globals.css';
import { AppProvider } from '../Contexts/AppContext';

function MyApp({ Component, pageProps }) {
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

  return (
    <AppProvider>
      <Layout>
        <Component podcasts={podcasts} {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
