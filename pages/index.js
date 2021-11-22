import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home({ podcasts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>PodPile</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>PodPile</h1>

        <p className={styles.description}>
          Get started by editing the
          <code className={styles.code}>podcast list</code>
        </p>

        <div className={styles.grid}>
          <Link href="/podcasts" podcasts={podcasts}>
            <a className={styles.card}>
              <h2>The Podcast List &rarr;</h2>
              <p>A quick place to save your list of podcasts to listen to</p>
              {/* {podcasts.map((podcast) => {
                return (
                  <div>
                    <p>{podcast.title}</p>
                  </div>
                );
              })} */}
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
