import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AppContext } from '../../Contexts/AppContext';
import { useContext } from 'react';
import EditModal from '../../components/EditModal';
import styles from '../../styles/Details.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// /notes/:id
export default function PodcastDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [podcast, setPodcast] = useState(null);
  const { podcastHandler } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  //TODO: fetch podcast
  useEffect(() => {
    let url = `/api/podcasts/${id}`;
    if (id) {
      fetch(url, { method: 'GET' })
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((results) => {
          setPodcast(results.podcast);
        })
        .catch((err) => {
          console.warn(err.message);
          let fake = {
            id,
            title: 'No such Podcast Exists',
            author: err.message,
          };
          setPodcast(fake);
        });
    }
  }, [id, showModal]);

  //============= edit =============

  if (showModal) {
    return (
      <div>
        <div>
          <EditModal podcast={podcast} setShowModal={setShowModal} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        <Link href="/podcasts">
          <a
            style={{
              position: 'absolute',
              left: '1rem',
              marginTop: '1.8rem',
              fontSize: '1rem',
            }}
          >
            &larr; Back
          </a>
        </Link>
        <h1 style={{ marginBottom: '3rem' }}>Details</h1>
        <div>
          {podcast && (
            <div>
              <Image
                src={`/images/${podcast.image}`}
                alt="cover"
                height={300}
                width={300}
                className={styles.mainImg}
              />
              <div className={styles.detailsSkirt}>
                <h1 style={{ margin: '0rem', padding: '0.5rem' }}>
                  {podcast.title}
                </h1>
                <div className={styles.authorChip}>
                  <h3>{podcast.author}</h3>
                  <div className={styles.chip}>
                    <h4>{podcast.genre}</h4>
                  </div>
                </div>
                <Stack className={styles.stack} spacing={2} direction="row">
                  <Link href="/podcasts" as="podcasts">
                    <a>
                      <DeleteIcon
                        variant="contained"
                        onClick={() => {
                          podcastHandler({ action: 'DELETE', payload: id });
                        }}
                        sx={{
                          marginRight: '5rem',
                          fontSize: '2rem',
                        }}
                      />
                    </a>
                  </Link>
                  <ModeEditIcon
                    variant="outlined"
                    style={{ fontSize: '2rem' }}
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                </Stack>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
