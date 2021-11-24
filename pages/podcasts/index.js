// /podcasts
// to display all podcasts GET /api/podcasts
// to do a fetch call, use api folder?
// same folder/naming convention for api than pages
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
// import podcastsHandler from '../api/podcasts';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';

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
    <div>
      <Link href="/podcasts/AddPodcast" as="/podcasts/AddPodcast">
        <a>
          <button>Add new podcast</button>
        </a>
      </Link>
      <h1>Podcast List will go here</h1>
      <p>Your list of podcast</p>
      {podcasts &&
        podcasts.map((podcast) => {
          return (
            <div key={podcast.id} className={styles.grid}>
              <Link
                key={podcast.id}
                href="/podcasts/[id]"
                as={`/podcasts/${podcast.id}`}
                pod={podcast}
              >
                <a className={styles.card}>
                  <Image
                    src={`/images/${podcast.image}`}
                    alt="cover"
                    height={150}
                    width={150}
                  />
                  <h2>{podcast.title}</h2>
                  <span>{podcast.author}</span>
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
