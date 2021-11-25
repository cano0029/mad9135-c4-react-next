// /podcasts
// to display all podcasts GET /api/podcasts
// to do a fetch call, use api folder?
// same folder/naming convention for api than pages
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/List.module.css';
// import podcastsHandler from '../api/podcasts';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Podcasts() {
  // const { podcastHandler } = useContext(AppContext);
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
    <div className={styles.main}>
      <div className={styles.screenHeader}>
        <h1>Podcast List</h1>
        <Link href="/podcasts/AddPodcast" as="/podcasts/AddPodcast">
          <a className={styles.addButton}>
            <AddCircleIcon
              sx={{
                color: 'white',
                border: '1px white',
                marginRight: '0.3rem',
              }}
            />
            <span style={{ marginTop: '0.1rem' }}>Add</span>
          </a>
        </Link>
      </div>
      <div className={styles.grid}>
        {podcasts &&
          podcasts.map((podcast) => {
            return (
              <div key={podcast.id} className={styles.card}>
                <Link
                  key={podcast.id}
                  href="/podcasts/[id]"
                  as={`/podcasts/${podcast.id}`}
                  pod={podcast}
                >
                  <a>
                    <Image
                      src={`/images/${podcast.image}`}
                      alt="cover"
                      height={150}
                      width={150}
                      className={styles.cover}
                    />
                    <h2 className={styles.title}>{podcast.title}</h2>
                    <span className={styles.author}>{podcast.author}</span>
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
