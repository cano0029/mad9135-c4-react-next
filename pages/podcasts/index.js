// /podcasts
// to display all podcasts GET /api/podcasts
// to do a fetch call, use api folder?
// same folder/naming convention for api than pages
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

export default function Podcasts({ podcasts }) {
  console.log(podcasts);

  return (
    <div>
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
