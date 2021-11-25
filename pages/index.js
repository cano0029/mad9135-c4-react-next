import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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
          Store your favourite <br /> podcasts here
        </p>

        <div className={styles.handContainer}>
          <Image
            src="/images/earphones.png"
            width={200}
            height={375}
            alt="hand"
          />

          <Link href="/podcasts" podcasts={podcasts}>
            <a className={styles.startButton}>
              <p>See Podcast List</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
